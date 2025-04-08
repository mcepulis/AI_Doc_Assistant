
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleName = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLogin = async () => {
        try {
            await axios.post("http://localhost:8000/login", {
                username,
                password,
            });
            navigate("/user");
        } catch (error) {
            console.error(error);
        }
    };

   return (
           <div>
               <h2>Login Page</h2>
               <input
                   type="text"
                   placeholder="Your Username"
                   value={username}
                   onChange={handleName}
               />
               <input
                   type="password"
                   placeholder="Your Password"
                   value={password}
                   onChange={handlePassword}
               />
               <button onClick={handleLogin}>Login</button>
               <p>
                   Already have an account? <Link to="/login">Login</Link>
               </p>
           </div>
       );
   };