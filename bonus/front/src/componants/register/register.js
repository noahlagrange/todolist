import React, { useState } from "react";
import './register.css'
import Cookies from 'js-cookie';

export default function Register () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setLast_name] = useState("");
  const [firstname, setFirst_name] = useState("");

    function validateForm() {
      return email.length > 0 && password.length > 0 && name.length > 0 && firstname.length > 0;
    }

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const user = { firstname, name, email, password };
        var token = "";

      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      }).then(function (res) {
        token = res.json();
        token.then((a) => {
            console.log(a);
            Cookies.set('token', a["token"])
            window.location.href = "/home";
        })
        return token;
      })
        .catch(() => { return "error" });
        return token;

    }

    return (
        <div className='div-login'>
            <div className="logo">
                <h1>Register</h1>
            </div>
            <div className="container" onSubmit={handleSubmit}>
                <form>
                  <p className="container">First name</p>
                  <input className="container" type="text" name="first_name" required onChange={(e) => setLast_name(e.target.value)}></input>
                  <p className="container">Last name</p>
                  <input className="container" type="text" name="last_name" required onChange={(e) => setFirst_name(e.target.value)}></input>
                  <p className="container">Email</p>
                  <input className="container" type="email" name="email" required onChange={(e) => setEmail(e.target.value)}></input>
                  <p className="container">Password</p>
                  <input className="container" type="password" name="pwd" required onChange={(e) => setPassword(e.target.value)}></input>
                  <button className="button" type="submit" disabled={!isValidEmail(email) && !validateForm()}>Log In</button>
                  <a className="container" href="/login">Already have a account ?</a>
                </form>
            </div>
        </div>
    );
}
