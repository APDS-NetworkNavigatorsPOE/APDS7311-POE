//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
//Ziimakc
//https://stackoverflow.com/users/10188661/ziimakc
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePayment.css';

function CreatePayment() {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://localhost:5000/api/payment/create', {
                amount: parseFloat(amount),
                currency: 'ZAR',
                recipientAccountNumber: '1234567890',
                SWIFTCode: 'NEDSZAJJXXX'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                setSuccess('Payment created successfully!');
                navigate('/payment');
            } else {
                setError('Failed to create payment');
            }
        } catch (err) {
            console.error("Error creating payment:", err);
            setError('Error creating payment');
        }
    };

    return (
        <div>
            <h1>Create New Payment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <button type="submit">Create Payment</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default CreatePayment;
