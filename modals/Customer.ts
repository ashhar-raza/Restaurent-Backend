import mongoose, { Schema, Document, Model, Mongoose } from "mongoose";

interface CustomerDoc extends Document {
    _id: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date ;
    lat: number;
    lng: number
}

const CustomerSchema = new Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    verified: { type: Boolean, required: true },
    otp: { type: Number, required: true },
    otp_expiry: { type: Date, required: true },
    lat: { type: Number },
    lng: { type: Number }
},
    {
        timestamps: true,
    });

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);
export { Customer };