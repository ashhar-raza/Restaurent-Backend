export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInputs {
    email: string;
    password: string;
}

export interface VendorTokenPayload {
    _id: string;
    name: string;
    email: string;
    foodType: [string];
}
export interface VendorEditInputs {
    phone: string;
    name: string;
    address: string;
    foodType: [string];
}
