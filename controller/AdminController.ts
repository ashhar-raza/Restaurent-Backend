import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../modals";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email: email });
    }
    else { return await Vendor.findById(id); }
}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, ownerName, foodType, address, pincode, phone } = <CreateVendorInput>req.body;

    const Vendorexists = await FindVendor('', email);
    if (Vendorexists) {
        res.json({ "message": `Vendor with ${email} exists` });
    }

    //generate salt
    const salt = await GenerateSalt();
    //generate password
    const userPassword = await GeneratePassword(password, salt);
    const CreatedVendor = await Vendor.create({
        name: name,
        pincode: pincode,
        address: address,
        email: email,
        password: userPassword,
        phone: phone,
        ownerName: ownerName,
        foodType: foodType,
        salt: salt,
        coverImage: [],
        serviceAvailable: false,
        rating: 0,
        food: []
    });
    res.json({ CreatedVendor });
}


export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find();
    if (vendors != null) {
        res.json(vendors);
    }
    else { res.json({ "message": "No vendors available" }); }
}


export const GetVendorByID = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const vendor = await FindVendor(id);
    if (vendor != null) {
        res.json(vendor);
    }
    else {
        res.json({ "message": "No vendor found" });
    }
}