import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

export default function Todo () {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [due_time, setDue_time] = useState("");

    const addTodo = (todo) => {
        const newTodo = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            due_date: todo.due_time,
            status: todo.status
        };
        setList([...list, newTodo]);
    }

    const pushTodo = () => {
        const newTodo = {
            title: input,
            description: description,
            due_time: due_time,
        };
        fetch("http://localhost:3000/todos/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "token": Cookies.get("token") },
            body: JSON.stringify(newTodo)
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
            window.location.href = "/login";
        });
    };

    const deleteTodo = (id) => {
        fetch("http://localhost:3000/todos/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "token": Cookies.get("token") },
            body: JSON.stringify()
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.location.reload();
        }).catch((err) => {
            console.log(err);
            window.location.href = "/login";
        });
    };

    const user_id = jwt(Cookies.get("token")).id;

    useEffect(() => {
    fetch("http://localhost:3000/user/todos/", {
            method: "GET",
            headers: { "Content-Type": "application/json", "token": Cookies.get("token") },
            body: JSON.stringify()
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    addTodo(data[i]);
                }
            setList(data);
            })
            .catch((err) => {
                console.log(err);
                window.location.href = "/login";
                return "MyError";
            });
    }, []);
    return (
        <div>
            <h1>Todo</h1>
            <form onSubmit={pushTodo}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <input type="text" value={due_time} onChange={(e) => setDue_time(e.target.value)}></input>
                <button type="submit">Add</button>
            </form>
                <ul>
                    {list.map((todo) =>
                        <li key={todo.id}>
                            {todo.title}<br></br>
                            {todo.description}<br></br>
                            {todo.status}<br></br>
                            <button onClick={() => deleteTodo(todo.id)}>delete</button>
                            <br></br><br></br><br></br>
                        </li>
                    )}
                </ul>
        </div>
    );
}
