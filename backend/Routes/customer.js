import express from 'express';
import Customer from '../models/Customer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get customer details by authenticated user's ID
router.get('/details', authMiddleware(), async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Update customer details by authenticated user's ID
router.put('/details', authMiddleware(), async (req, res) => {
    const { fullName, username, email, IDNumber, accountNumber } = req.body;
    const updateFields = { fullName, username, email, IDNumber, accountNumber };

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.user.id, updateFields, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json({ message: "Customer updated successfully", updatedCustomer });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Delete customer by authenticated user's ID
router.delete('/details', authMiddleware(), async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await Customer.findByIdAndDelete(req.user.id);
        res.json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;
