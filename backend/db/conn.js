// db/conn.js
//This code was adapted from Stack Overflow
//https://stackoverflow.com/questions/20277023/peerconnection-based-on-local-ips
//Gnagy
//https://stackoverflow.com/users/2564634/gnagy
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const ATLAS_URI = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to ${MONGO_URI}`);
    } catch (err) {
        console.error(`Failed to connect to ${MONGO_URI}: ${err.message}`);
        console.log(`Trying to connect to ${ATLAS_URI}`);
        try {
            await mongoose.connect(ATLAS_URI);
            console.log(`Connected to ${ATLAS_URI}`);
        } catch (err) {
            console.error(`Failed to connect to MongoDB`, err);
            process.exit(1);
        }
    }
};

export default connectDB;
