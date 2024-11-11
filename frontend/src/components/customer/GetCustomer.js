//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
//Ziimakc
//https://stackoverflow.com/users/10188661/ziimakc
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GetCustomer.css';

function GetCustomer() {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get('https://localhost:5000/api/customers/details', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCustomer(response.data);
            } catch (err) {
                console.error("Error fetching customer details:", err);
                setError('Unable to load customer details.');
            }
        };
        fetchCustomer();
    }, [navigate]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete('https://localhost:5000/api/customers/details', {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/login");
        } catch (error) {
            console.error("Error deleting customer", error);
            setError('Error deleting customer.');
        }
    };

    const handleUpdate = () => {
        navigate(`/update/${customer._id}`);
    };

    return (
        <div className="container">
            <h1>Your Customer Details</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : customer ? (
                <div className="customer-info">
                    <strong>Full Name:</strong> {customer.fullName} <br />
                    <strong>Username:</strong> {customer.username} <br />
                    <strong>Email:</strong> {customer.email} <br />
                    <strong>ID Number:</strong> {customer.IDNumber.slice(0, 6)}******* <br />
                    <strong>Account Number:</strong> ****{customer.accountNumber.slice(-4)} <br />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default GetCustomer;
