const db = require("../../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = function (req, res, next) {
    var sql_req = "INSERT INTO user (email, password, name, firstname) VALUES ?";
    var hashed_password = bcrypt.hashSync(req.body.password, process.env.SALT);
    var values = [
        [req.body.email, hashed_password, req.body.name, req.body.firstname]
    ];
    for (var i = 0; i < values[0].length; i++) {
        if (values[0][i] == undefined) {
            return res.status(400).send("Bad parameter");
        }
    }
    db.connection.query(sql_req, [values], function (err, result) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                return res.status(409).send("Account already exist");
            }
            return res.status(500).send("Internal server error");
        }
        const payload = {
            email: req.body.email,
            username: req.body.username // mettre l'id
        };
        jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"}, (err, token) => {
            if (err) {
                return res.status(401).json({"msg": "Invalid credentials"});
            }
            res.status(201).json({"token": token});
        });
    });
}

const login = function (req, res, next) {
    var sql_req = "SELECT * FROM user WHERE email =? AND password =?";
    var hashed_password = bcrypt.hashSync(req.body.password, process.env.SALT);
    var values = [[req.body.email], [hashed_password]];
    for (var i = 0; i < values.length; i++) {
        if (values[i][0] == undefined) {
            return res.status(400).send("Bad request");
        }
    }
    db.connection.query(sql_req, values, (err, result) => {
        if (err) {
            return res.status(500).send("Internal server error");
        }
        if (result.length == 0) {
            return res.status(401).send("Invalid credentials");
        }
        const payload = {
            email: req.body.email,
            id: result[0].id
        };
        jwt.sign(payload, process.env.SECRET, {expiresIn: "1d"}, (err, token) => {
            if (err) {
                return res.status(401).json({"msg": "Invalid credentials"});
            }
            res.status(200).json({"token": token});
        });
    });
};

module.exports = {login, register};
