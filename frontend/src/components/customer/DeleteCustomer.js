import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DeleteCustomer.css';

function DeleteCustomer() {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete('https://localhost:5000/api/customers/details', {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/login");
        } catch (error) {
            console.error("Error deleting customer", error);
        }
    };

    return (
        <div>
            <h1>Delete Customer</h1>
            <p>Are you sure you want to delete this customer?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate("/customers")}>Cancel</button>
        </div>
    );
}

export default DeleteCustomer;
