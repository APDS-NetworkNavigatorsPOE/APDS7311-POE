import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateCustomer.css';

function UpdateCustomer() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        fullName: '',
        username: '',
        email: '',
        IDNumber: '',
        accountNumber: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://localhost:5000/api/customers/details', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCustomer(response.data);
            } catch (err) {
                setError('Unable to fetch customer details.');
            }
        };
        fetchCustomer();
    }, []);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        try {
            await axios.put('https://localhost:5000/api/customers/details', customer, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Customer updated successfully!');
            navigate("/customers");
        } catch (err) {
            setError('Failed to update customer details.');
        }
    };

    return (
        <div className="container">
            <h1>Update Customer</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={customer.fullName} onChange={handleChange} />
                <label>Username:</label>
                <input type="text" name="username" value={customer.username} onChange={handleChange} />
                <label>Email:</label>
                <input type="email" name="email" value={customer.email} onChange={handleChange} />
                <label>ID Number:</label>
                <input type="text" name="IDNumber" value={customer.IDNumber} onChange={handleChange} />
                <label>Account Number:</label>
                <input type="text" name="accountNumber" value={customer.accountNumber} onChange={handleChange} />
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
