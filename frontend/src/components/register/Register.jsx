
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setConfirmPassword] = useState("");

    const handleName = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleRepeatPassword = (e) => setConfirmPassword(e.target.value);



    const handleRegister = async () => {
        console.log("Register button clicked ✅");
        if (password !== repeatPassword) {
            alert("Passwords do not match");
            return null;
        }
    
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return null;
        }
    
        if (username.length < 3) {
            alert("Username must be at least 3 characters long");
            return null;
        }
    
        if (username.length > 20) {
            alert("Username must be at most 20 characters long");
            return null;
        }
    
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            alert("Username must contain only letters and numbers");
            return null;
        }
    
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            alert(
                "Password must contain at least one lowercase letter, one uppercase letter, and one number"
            );
            return null;
        }

        try {
            await axios.post("http://localhost:8000/register", {
                username,
                password,
            });
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>Register Page</h2>
            <input
                type="text"
                placeholder="New Username"
                value={username}
                onChange={handleName}
            />
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={handlePassword}
            />
            <input
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={handleRepeatPassword}
            />
            <button onClick={handleRegister}>Register</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

