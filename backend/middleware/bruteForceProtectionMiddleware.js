import ExpressBrute from "express-brute";
import MongooseStore from 'express-brute-mongoose';
import mongoose from 'mongoose';

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date,
    },
    expires: { type: Date, index: { expires: "1d" } }
});

const BruteForceModel = mongoose.model("bruteforce", bruteForceSchema);
const store = new MongooseStore(BruteForceModel);

// Use username only as the key to track attempts by user
const getUserKey = (req) => req.body.username || "unknown_user";

const bruteForce = new ExpressBrute(store, {
    freeRetries: 5, // Increase retry attempts
    minWait: 0.5 * 60 * 1000, // Adjust wait time (30 seconds)
    maxWait: 5 * 60 * 1000, // Maximum wait time (5 minutes)
    failCallback: function(req, res, next, nextValidRequestDate) {
        res.status(429).json({
            message: "Too many failed attempts. Please try again later.",
            nextValidRequestDate
        });
    }
});

export default bruteForce;
