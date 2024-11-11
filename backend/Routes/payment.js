import express from 'express';
import Payment from '../models/Payment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all payments for the authenticated customer
router.get('/', authMiddleware(), async (req, res) => {
    try {
        const payments = await Payment.find({ customerID: req.user.id });
        res.json(payments);
    } catch (err) {
        console.error("Error fetching payments:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new payment for the authenticated customer
router.post('/create', authMiddleware(), async (req, res) => {
    const { amount, currency, recipientAccountNumber, SWIFTCode } = req.body;

    if (!amount || !currency || !recipientAccountNumber || !SWIFTCode) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPayment = new Payment({
            customerID: req.user.id,
            amount,
            currency,
            recipientAccountNumber,
            SWIFTCode,
            status: 'Pending'
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (err) {
        console.error("Error creating payment:", err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

export default router;
