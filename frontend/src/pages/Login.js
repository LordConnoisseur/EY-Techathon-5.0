import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../authService";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { roles } = await login(email, password);

            if (roles.includes("admin")) {
                navigate("/admin/dashboard");
            } else if (roles.includes("manager")) {
                navigate("/manager_dashboard");
            } else if (roles.includes("agent")) {
                navigate("/call-queue");
            } else {
                navigate("/clientdashboard");
            }
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Welcome Back</h2>
                <p className="subtext">Log in to access your account</p>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>

                <a href="#" className="forgot-password">Forgot your password?</a>
            </div>
        </div>
    );
}

export default Login;
