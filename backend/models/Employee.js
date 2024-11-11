// models/Employee.js
//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/70618815/new-to-react-where-do-you-put-your-model-methods
// Emil Karlsson
//https://stackoverflow.com/users/12057512/emil-karlsson
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'employee' } // Role to distinguish employees from other user types
});

export default mongoose.model('Employee', employeeSchema);
