
import mongoose from 'mongoose';
import { MONGO_URI } from '../config';





// Connect to MongoDB

export default async () => {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err);
        });
}




