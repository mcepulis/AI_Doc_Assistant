import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function User() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            logout();
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // current time in seconds
            if (decoded.exp < now) {
                logout();
                navigate("/");
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout();
            navigate("/");
        }
    }, [logout, navigate]);


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
