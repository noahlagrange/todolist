const db = require("../../config/db.js");
const jwt = require("jsonwebtoken");

const create_todos = function (req, res, next) {
    var sql_request = "INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                res.status(401).json({msg: "No token provided"});
            } else {
                console.log(err);
                res.status(500).json({msg: "Internal server error"});
            }
        } else {
            var values = [req.body.title, req.body.description, req.body.due_time, "not started", decoded.id];
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    res.status(400).json({msg: err});
                } else {
                    res.status(201).json(result);
                }
            });
        }
    });
};

const get_todos = function (req, res, next) {
    var sql_request = "SELECT * FROM todo";
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                res.status(401).json({msg: "No token provided"});
            } else {
                console.log(err);
                res.status(500).json({msg: "Internal server error"});
            }
        } else {
            db.connection.query(sql_request, function (err, result) {
                if (err) {
                    res.status(400).json({msg: err});
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
}

const get_todos_id = function (req, res, next) {
    var sql_request = "SELECT * FROM todo WHERE id = ?";
    var values = [[req.originalUrl.split("/")[2]]];
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                res.status(401).json({msg: "No token provided"});
            } else {
                console.log(err);
                res.status(500).json({msg: "Internal server error"});
            }
        } else {
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    res.status(400).json({msg: err});
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
}

const edit_todos = function (req, res, next) {
    var sql_request = "UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ?";
    var id = req.originalUrl.split("/")[2];
    var values = [req.body.title, req.body.description, req.body.due_time, req.body.status, id];
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                res.status(401).json({msg: "No token provided"});
            } else {
                console.log(err);
                res.status(500).json({msg: "Internal server error"});
            }
        } else {
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    res.status(400).json({msg: err});
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
}

const delete_todos = function (req, res, next) {
    var sql_request = "DELETE FROM todo WHERE id = ?";
    var id = req.originalUrl.split("/")[2];
    var values = [id];
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.code === "TokenInvalidError") {
                res.status(401).json({msg: "Token is not valid"});
            } else if (err.code === "NoTokenProvidedError") {
                res.status(401).json({msg: "No token provided"});
            } else {
                console.log(err);
                res.status(500).json({msg: "Internal server error"});
            }
        } else {
            db.connection.query(sql_request, values, function (err, result) {
                if (err) {
                    res.status(400).json({msg: err});
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
}



module.exports = {create_todos, delete_todos, edit_todos, get_todos, get_todos_id};
