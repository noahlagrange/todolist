import Cookies from "js-cookie";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './user_id.css';

export default function UserId () {

    var id = 0;
    const [oldName, setName] = useState("");
    const [oldMail, setMail] = useState("");
    const [oldFirstname, setFirstname] = useState("");
    const [oldPassword, setPassword] = useState("");
    const { idd } = useParams();

    var token = Cookies.get("token")
    var return_value = fetch('http://localhost:3000/users/' + idd.toString(), {
            method: 'GET',
            headers: { "Content-Type": "application/json", "token": token },
            body: JSON.stringify()
            }).then((res) => res.json())
            .then((res) => {
                id = res[0].id;
                setName(res[0].name);
                setMail(res[0].email);
                setFirstname(res[0].firstname);
                setPassword(res[0].password);
                console.log(oldMail);
            })
            .catch((err) => {
                console.log(err);
                return "MyError"
            })
    return_value.then((res) => {
        if (res === "MyError") {
            window.location.href = "/login";
        }
    });
    function handleEdit () {
        var name = document.getElementById("name").value;
        var firstname = document.getElementById("firstname").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("mail").value;
        if (name === "") {
            name = oldFirstname;
        }
        if (email === "") {
            email = oldMail;
        }
        if (firstname === "") {
            firstname = oldName;
        }
        if (password === "") {
            password = oldPassword;
        }
        const new_user = { name, email, firstname, password };
        fetch('http://localhost:3000/users/' + idd.toString(), {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "token": token },
            body: JSON.stringify(new_user)
        }).then((res) => res.json())
        .then((res) => {
            console.log(res);
        })
    }
    function handleDelete () {
        var answer = window.prompt("Are you sure you want to delete your account ? Type 'delete' to confirm");
        if (answer === "delete") {
            fetch('http://localhost:3000/users/' + idd.toString(), {
                method: 'DELETE',
                headers: { "Content-Type": "application/json", "token": token },
                body: JSON.stringify()
            }).then((res) => res.json())
            .then((res) => {
                console.log(res);
                Cookies.remove("token");
                window.location.href = "/login";
            })
        } else {
            console.log("You didn't confirm the deletion of your account");
        }

    }

    return (
        <div>
            <h1>Your name: {oldFirstname}</h1>
            <h1>Your firstname: {oldName}</h1>
            <h1>Your email: {oldMail[0] + '*********' + '@' + oldMail.split('@')[1]}</h1>
            <form>
                <p>Change your name : </p>
                <input type="text" id="name" placeholder={"Write something to edit..."}></input>
                <p>Change your firstname : </p>
                <input type="text" id="firstname" placeholder={"Write something to edit..."}></input>
                <p>Change your mail address : </p>
                <input type="text" id="mail" placeholder={"Write something to edit..."}></input>
                <p>Change your password : </p>
                <input type="password" id="password" placeholder={"Write something to edit..."}></input>
                <button onClick={handleEdit}>Save changes</button>
                <button onClick={handleDelete}>Delete account</button>
            </form>
        </div>
    )
};
