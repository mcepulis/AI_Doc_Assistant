import React from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

export function User() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();         
        navigate("/");   
    };

    return (
        <div>
            <h2>Hello World</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
