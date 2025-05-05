import mongoose, { Document, Schema } from "mongoose";

interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    rating: number;
    price: number;
    images: [string];
}

const FoodSchema = new Schema({
    vendorId: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    rating: { type: Number },
    price: { type: Number },
    images: { type: [String] },
}, {
    timestamps: true,
})



export const Food = mongoose.model<FoodDoc>('food',FoodSchema);
