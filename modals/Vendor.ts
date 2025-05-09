import mongoose, { Schema, Document, Model, Mongoose } from "mongoose";

interface VendorDoc extends Document {
    _id: string;
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: string;
    coverImage: [string];
    rating: number;
    food: any;
}

const VendorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImage: { type: [String] },
    rating: { type: Number },
    food: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'food'
    }],

},
    {
        timestamps: true,
    });

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema);
export { Vendor };