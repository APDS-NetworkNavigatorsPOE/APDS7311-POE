//This code was adapted from stack Overflow
//https://stackoverflow.com/questions/14588032/mongoose-password-hashing
//Noah
//https://stackoverflow.com/users/1095114/noah
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import bruteForce from '../middleware/bruteForceProtectionMiddleware.js';
import loginAttemptLogger from '../middleware/loginAttemptLogMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to validate inputs
const validateInput = (regex, value) => regex.test(value);

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const idNumberRegex = /^[0-9]{13}$/;
const accountNumberRegex = /^[0-9]{10,20}$/;
const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{6,30}$/;

// Register Route for Customers Only
router.post('/register', async (req, res) => {
    try {
        const { fullName, username, email, IDNumber, accountNumber, password } = req.body;

        if (!fullName || !username || !email || !IDNumber || !accountNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateInput(usernameRegex, username) || !validateInput(emailRegex, email) || 
            !validateInput(idNumberRegex, IDNumber) || !validateInput(accountNumberRegex, accountNumber) || 
            !validateInput(passwordRegex, password)) {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        // Check if username, email, or IDNumber is already used
        const existingCustomer = await Customer.findOne({ $or: [{ username }, { email }, { IDNumber }] });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Username, email, or ID number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
            fullName,
            username,
            email,
            IDNumber,
            accountNumber,
            password: hashedPassword,
            role: 'customer' // Set default role as customer
        });

        await newCustomer.save();
        res.status(201).json({ message: "Customer registered successfully", customer: newCustomer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Login Route with Role-Based Login
router.post('/login', bruteForce.prevent, loginAttemptLogger, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!validateInput(usernameRegex, username) || !validateInput(passwordRegex, password)) {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        // Check if user is a customer or employee
        let user = await Customer.findOne({ username });
        let role = 'customer';

        if (!user) {
            user = await Employee.findOne({ username });
            role = 'employee';
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Reset brute force attempts on successful login
        await bruteForce.reset(username);

        const token = jwt.sign({ id: user._id, username, role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                IDNumber: user.IDNumber,
                accountNumber: user.accountNumber,
                userID: user._id,
                username,
                role // Include role in the response
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Logout Route
// In your auth.js or similar
router.post('/logout', async (req, res) => {
    const username = req.body.username || req.user?.username;
    try {
        if (username) {
            await bruteForce.reset(username); // Reset brute-force attempts
        }
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error during logout:", err);
        res.status(500).json({ message: "Failed to logout" });
    }
});

export default router;
