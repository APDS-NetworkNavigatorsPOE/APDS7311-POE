// models/Customer.js
//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/70618815/new-to-react-where-do-you-put-your-model-methods
// Emil Karlsson
//https://stackoverflow.com/users/12057512/emil-karlsson
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email address"]
    },
    IDNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'customer'
    }
});

export default mongoose.model("Customer", customerSchema);
