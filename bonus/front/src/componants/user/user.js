import Cookies from "js-cookie";
import { useId, useState } from "react";

export default function User () {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');

    var token = Cookies.get("token")
    
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: { "Content-Type": "application/json", "token": token },
            body: JSON.stringify()
            }).then((res) => res.json())
            .then((res) => {
                setId(res[0].id);
                setName(res[0].name);
                setEmail(res[0].email);
                setFirstname(res[0].firstname);
            })
         .catch(() => {
            return "error"
         })


    return (
        <div className="user" >
            <p>{id}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{firstname}</p>
        </div>  
    )
};
