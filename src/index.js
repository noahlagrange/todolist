const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();
const port = process.env.PORT; // this should be in the . env file /!
const auth = require("./routes/auth/auth.js");
const user = require("./routes/user/user.js");
const todos = require("./routes/todos/todos.js");
const db = require("./config/db.js");
const jwt = require("jsonwebtoken");

app.get ("/", (req ,res) => {
    var sql_req = "SELECT * FROM user";
    db.connection.connect(function (err) {
        db.connection.query(sql_req, function (err, result) {
            if (err) {
                return res.status(500);
            }
            res.status(200).send(result);
        });
    });
    console.log("homepage");
});

app.post("/register", auth.register, (req, res) => {});

app.post("/login", auth.login, (req, res) => {});

app.get("/user", user.show_user, (req, res) => {});

app.get("/user/todos", user.get_todos_user, (req, res) => {});

app.get(/\/users\/(\d+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/, user.get_user_id_email, (req, res) => {});

app.put(/\/users\/\d+/, user.edit_user, (req, res) => {});

app.delete(/\/users\/\d+/, user.delete_user, (req, res) => {});

app.get("/todos", todos.get_todos, (req, res) => {});

app.get(/\/todos\/\d+/, todos.get_todos_id, (req, res) => {});

app.post("/todos", todos.create_todos, (req, res) => {});

app.put(/\/todos\/\d+/, todos.edit_todos, (req, res) => {});

app.delete(/\/todos\/\d+/, todos.delete_todos, (req, res) => {});

app.listen (port, () => {
    console.log (`Example app listening at http://localhost:${port}`) ;
}) ;
