
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleName = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post("http://localhost:8000/login", {
                username,
                password,
            });
            console.log(response.data);
            navigate("/user");
        } catch (error) {
            setError(error.response?.data?.detail);
        }
    };

   return (
           <div>
               <h2>Login Page</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
               </form>
               {error && <p>{error}</p>}
           </div>
       );
   };