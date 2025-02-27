

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoles, logout } from '../authService';

const Dashboard = () => {
    const navigate = useNavigate();
    const roles = getRoles();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome, {roles[0]}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
