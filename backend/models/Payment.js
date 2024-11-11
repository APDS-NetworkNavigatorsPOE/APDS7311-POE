//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/70618815/new-to-react-where-do-you-put-your-model-methods
// Emil Karlsson
//https://stackoverflow.com/users/12057512/emil-karlsson
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    recipientAccountNumber: {
        type: String,
        required: true,
    },
    SWIFTCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

export default mongoose.model("Payment", paymentSchema);
