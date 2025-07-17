import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Important if you're using sessions
            body: JSON.stringify({ username, password })
        });

        if (result.ok) {
            const results = await result.json();
            alert(results.message);
            navigate('/dashboard');
        } else {
            const error = await result.json();
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
