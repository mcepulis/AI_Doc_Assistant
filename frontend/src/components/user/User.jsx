import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import style from "./User.module.css";

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
            const now = Date.now() / 1000; 
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
        <div className={style.userPage}>
            <header className={style.header}>
                <div className={style.left}>
                {/* <button onClick={handleUploadClick}>Upload File</button> */}
                <button>Upload File</button>
                </div>
                <div className={style.right}>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                <button onClick={handleLogout}>Logout</button>
                {/* <button>Logout</button> */}
                </div>
            </header>
            <main className={style.chatArea}>
                {/* Placeholder for chatbot */}
                <div className={style.chatPlaceholder}>Chatbot interface coming soon...</div>
            </main>
            <footer className={style.footer}>
                <p>© 2025 DocChat</p>
            </footer>
        </div>
    );
}
