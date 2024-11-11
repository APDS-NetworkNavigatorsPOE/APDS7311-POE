//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
//Ziimakc
//https://stackoverflow.com/users/10188661/ziimakc
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import './Paymentpage.css';

function PaymentPage() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required.');
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get('https://localhost:5000/api/payment', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPayments(response.data);
            } catch (err) {
                console.error("Error fetching payments:", err);
                setError('Error fetching payments');
            }
        };
        fetchPayments();
    }, [navigate]);

    return (
        <div>
            <h1>Payment Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <NavLink to="/create">
                <button>Create New Payment</button>
            </NavLink>
            <h2>Payment List</h2>
            {payments.length > 0 ? (
                <ul className="payment-list">
                    {payments.map(payment => (
                        <li key={payment._id} className="payment-list-item">
                            <p><strong>Customer ID:</strong> {payment.customerID}</p>
                            <p><strong>Amount:</strong> {payment.amount}</p>
                            <p><strong>Currency:</strong> {payment.currency}</p>
                            <p><strong>Recipient Account Number:</strong> {payment.recipientAccountNumber}</p>
                            <p><strong>SWIFT Code:</strong> {payment.SWIFTCode}</p>
                            <p><strong>Status:</strong> {payment.status}</p>
                            <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No payments available.</p>
            )}
        </div>
    );
}

export default PaymentPage;
