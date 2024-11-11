//This code was adapted from stack Overflow
//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//Drew Reese
//https://stackoverflow.com/users/8690857/drew-reese
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('https://localhost:5000/api/auth/logout');
            localStorage.clear();
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {!isAuthenticated ? (
                    <>
                        <li><NavLink to="/register" className="navbar-link">Register</NavLink></li>
                        <li><NavLink to="/login" className="navbar-link">Login</NavLink></li>
                    </>
                ) : (
                    <>
                        {role === 'customer' && (
                            <>
                                <li><NavLink to="/customers" className="navbar-link">Customers</NavLink></li>
                                <li><NavLink to="/payment" className="navbar-link">Payment Page</NavLink></li>
                            </>
                        )}
                        {role === 'employee' && (
                            <>
                                <li><NavLink to="/employee/dashboard" className="navbar-link">Employee Dashboard</NavLink></li>
                                <li><NavLink to="/employee/payments" className="navbar-link">Employee Payments</NavLink></li>
                            </>
                        )}
                        <li><button onClick={handleLogout} className="navbar-link">Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
