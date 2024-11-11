//This code was adapted from stack Overflow
//https://stackoverflow.com/questions/14588032/mongoose-password-hashing
//Noah
//https://stackoverflow.com/users/1095114/noah
import express from 'express';
import Payment from '../models/Payment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch all payments for employees
router.get('/payments', authMiddleware('employee'), async (req, res) => {
    try {
        const payments = await Payment.find().populate('customerID', 'username email');
        res.json(payments);
    } catch (err) {
        console.error("Error fetching payments:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update payment status (Accept/Reject) for employees
router.patch('/payments/:id', authMiddleware('employee'), async (req, res) => {
    const { status } = req.body;
    if (!['Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        console.error("Error updating payment status:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
