// models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'employee' } // Role to distinguish employees from other user types
});

export default mongoose.model('Employee', employeeSchema);
