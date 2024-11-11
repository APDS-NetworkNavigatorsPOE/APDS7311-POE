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
