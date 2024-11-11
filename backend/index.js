import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';
import authRoutes from './Routes/auth.js';
import customerRoutes from './Routes/customer.js';
import paymentRoutes from './Routes/payment.js';
import employeeRoutes from './Routes/employee.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: 'https://localhost:3000', credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);  // Updated to match "/api/customers"
app.use('/api/payment', paymentRoutes);
app.use('/api/employee', employeeRoutes);

// SSL Certificate and Key
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem'),
};

// HTTPS Server
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server is running on port ${PORT}`);
});
