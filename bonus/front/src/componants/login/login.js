import React, { useState } from "react";
import './login.css'
import Cookies from 'js-cookie'


export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, password };
    var token = "";

    token = fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      }).then(function (res) {
        token = res.json();
        return token
      })
      .catch(() => {
        return "error"
      })
      return token
    }


    return (
        <div className='div-login'>
            <div className="logo">
              <h1>Login</h1>
            </div>
            <div className="container" onSubmit={(e) => {
              var token = handleSubmit(e)
              token.then((a) => {
                Cookies.set('token', a["token"]);
                window.location.href = "/home";
              })
            }}>
                <form>
                    <p className="container">Email</p>
                    <input className="container" type="email" name="email" required onChange={(e) => setEmail(e.target.value)}></input>
                    <p className="container">Password</p>
                    <input className="container" type="password" name="pwd" required onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button" type="submit" disabled={!isValidEmail(email) && !validateForm()}>Log In</button>
                    <a className="container" href="/register">No account ?</a>
                </form>
            </div>
        </div>
    );
}
