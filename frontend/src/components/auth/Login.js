//This code was adapted from stack Overflow
//https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
//Jiew Meng
//https://stackoverflow.com/users/292291/jiew-meng
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://localhost:5000/api/auth/login', { username, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userID', user.userID);
            localStorage.setItem('role', user.role);

            if (user.role === 'customer') {
                navigate("/customers");
            } else if (user.role === 'employee') {
                navigate("/employee/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;
