import { Request, Response, NextFunction } from 'express';
import { VendorEditInputs, VendorLoginInputs } from '../dto';
import { ComparePassword, GenerateToken } from '../utility';
import { FindVendor } from './AdminController';
import { Food } from '../modals';


export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInputs>req.body;
    const vendor = await FindVendor('', email);
    if (vendor !== null) {

        const result = await ComparePassword(password, vendor.password);
        if (result) {

            const accessToken = await GenerateToken({
                _id: (vendor._id.toString()),
                name: vendor.name,
                email: vendor.email,
                foodType: vendor.foodType
            })
            res.json({ "message": "Logged In Successfully", "accessToken": accessToken });
        }
        else {
            res.json({ "message": "Inccorect Credentials" });
        }
    }
    else {
        res.json({ "message": "No vendor found" });
    }
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        res.json(existingVendor);
    } else { res.json({ "message": "No Vendor Found" }); }
}
export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { phone, name, address, foodType } = <VendorEditInputs>req.body;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.phone = phone;
            existingVendor.address = address;
            existingVendor.foodType = foodType;
            const result = await existingVendor.save();
            res.json(result);
        } else {
            res.json({ "message": "No Vendor Found" });
        }
    } else { res.json({ "message": "No Vendor Found" }); }
}
export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvailable = (!JSON.parse(existingVendor.serviceAvailable)).toString();
            const result = await existingVendor.save();
            res.json(result);
        } else {
            res.json({ "message": "No Vendor Found" });
        }
    } else { res.json({ "message": "No Vendor Found" }); }
}
export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const foods = await Food.find
            ({ vendorId: user._id });
        if (foods !== null) {
            res.json(foods);
        }
        else {
            res.json({ "message": "No Foods To Fetch" });
        }
    } else { res.json({ "message": "Error Fetching Foods" }); }
}


export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {

        const {
            description,
            category,
            foodType,
            readyTime,
            name,
            price } = req.body;

        const existingVendor = await FindVendor(user._id);
        if (existingVendor !== null) {
            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);
            const CreateFood = await Food.create({
                vendorId: existingVendor._id.toString(),
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images: images,
                rating: 0
            });
            existingVendor.food.push(CreateFood);
            const result = await existingVendor.save();
            res.json(result);
        }

    } else { res.json({ "message": "Error Adding Foods" }); }
}
export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor(user._id);

        if (existingVendor !== null) {
            const files = req.files as Express.Multer.File[];
            console.log(files);
            const images = files.map((file: Express.Multer.File) => file.filename);
            const paths = files.map((file: Express.Multer.File) => file.path);

            console.log(existingVendor, images);


            existingVendor.coverImage.push(...images);

            const result = await existingVendor.save();
            res.json({ result, "path": paths });
        } else {
            res.status(404).json({ message: "Vendor not found" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
