//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
//Ziimakc
//https://stackoverflow.com/users/10188661/ziimakc
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeePayments() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required.');
                return;
            }

            try {
                const response = await axios.get('https://localhost:5000/api/employee/payments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(response.data);
            } catch (err) {
                console.error("Error fetching payments:", err);
                setError('Failed to fetch payments.');
            }
        };
        fetchPayments();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`https://localhost:5000/api/employee/payments/${id}`, 
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPayments(payments.map(payment => 
                payment._id === id ? { ...payment, status } : payment
            ));
        } catch (err) {
            console.error("Error updating payment status:", err);
            setError('Failed to update payment status.');
        }
    };

    return (
        <div>
            <h1>Employee Payments</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {payments.map(payment => (
                    <li key={payment._id}>
                        <p>Customer: {payment.customerID.username} ({payment.customerID.email})</p>
                        <p>Amount: {payment.amount} {payment.currency}</p>
                        <p>Status: {payment.status}</p>
                        <p>Date: {new Date(payment.createdAt).toLocaleString()}</p>
                        <button onClick={() => handleUpdateStatus(payment._id, 'Accepted')}>Accept</button>
                        <button onClick={() => handleUpdateStatus(payment._id, 'Rejected')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeePayments;
