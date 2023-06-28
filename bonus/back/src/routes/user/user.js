const db = require("../../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const show_user = function (req, res, next) {
    var sql_request = "SELECT * FROM user WHERE id = ?";
    var email = "";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                return res.status(401).send("Token is not valid");
            } else if (err.code === "NoTokenProvidedError") {
                return res.status(401).send("No token provided");
            } else {
                return res.status(500).send("Internal server error");
            }
        } else {
            id = decoded.id;
        }
    });

    var values = [id];
    db.connection.connect(function (err) {
        db.connection.query(sql_request, [values], function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send("Bad request");
            } else if (result.length === 0) {
                return res.status(404).send("User not found");
            }
            return res.status(200).send(result);
        });
    });
}

const get_user_id_email = function (req, res, next) {
    var sql_request = "SELECT * FROM user WHERE email =? OR id =?";
    var email = "";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                return res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                return res.status(401).json({msg: "No token provided"});
            } else {
                return res.status(500).json({msg: "Internal server error"});
            }
        } else {
            var value = [req.params["0"], req.params["0"]];
            db.connection.connect(function (err) {
                db.connection.query(sql_request, value, function (err, result) {
                    if (err) {
                        return res.status(400).json({msg: "Bad request"});
                    }
                    return res.status(200).json(result);
                });
            });
        }
    });
}

const get_todos_user = function (req, res, next) {
    var sql_request = "SELECT * FROM todo WHERE user_id =?";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                return res.status(401).json({msg: "Token is not valid"});
            }
            if (err.code === "NoTokenProvidedError") {
                return res.status(401).json({msg: "No token provided"});
            }
        } else {
            var values = [decoded.id];
            db.connection.connect(function (err) {
                db.connection.query(sql_request, values, function (err, result) {
                    if (err) {
                        return res.status(400).json({msg: "Bad request"});
                    }
                    return res.status(200).json(result);
                });
            });
        }
    });
}

const edit_user = function (req, res, next) {
    console.log("EDITING USER");
    var sql_request = "UPDATE user SET email =?, password =?, name =?, firstname =? WHERE id =?";
    if (req.body.password[0] === "$") {
        var hashedPassword = req.body.password;
    } else {
        var hashedPassword = bcrypt.hashSync(req.body.password, process.env.SALT);
    }
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        var values = [[req.body.email], [hashedPassword], [req.body.firstname], [req.body.name], [decoded.id]]
        if (err) {
            console.log(err);
            if (err.code === "TokenInvalidError") {
                return res.status(401).json({msg: "Token is not valid"});
            }
            if (err.code === "NoTokenProvidedError") {
                return res.status(401).json({msg: "No token provided"});
            }
        } else {
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({msg: "Bad request"});
                }
                console.log(result);
                return res.status(200).json(result);
            });
        }
    });
}

const delete_user = function (req, res, next) {
    var sql_request = "DELETE FROM user WHERE id =?";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                return res.status(401).json({msg: "Token is not valid"});
            }
            if (err.code === "NoTokenProvidedError") {
                return res.status(401).json({msg: "No token provided"});
            }
        } else {
            var values = [decoded.id];
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    return res.status(400).json({msg: "Bad request"});
                }
                return res.status(200).json(result);
            });
        }
    });
}

module.exports = {delete_user, edit_user, get_todos_user, get_user_id_email, show_user};
