//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/70618815/new-to-react-where-do-you-put-your-model-methods
// Emil Karlsson
//https://stackoverflow.com/users/12057512/emil-karlsson
import mongoose from 'mongoose';

const logininAttemptSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        immutable: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores"]
    },
    ipAddress:{
        type: String,
        required: true,
        immutable: true
    },
    successfulLogin:{
        type: Boolean,
        required: true,
        immutable: true
    },
    timestamp:{
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempt", logininAttemptSchema);