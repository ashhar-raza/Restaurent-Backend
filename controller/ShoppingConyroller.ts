import { Request, Response, NextFunction } from "express";
import { Vendor } from "../modals";
import { CreateFoodInput } from "../dto";

export const GetFoodAvailablity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pincode } = req.params;

        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true })
            .sort([["rating", "descending"]])
            .populate("food");

        if (result && result.length > 0) {
            res.status(200).json({ result });
        }
        else {

            res.status(404).json({ message: "No data found" }); // Fixed typo
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error Occured ", "error": error });
    }
};
export const GetTopRestaurents = async (req: Request, res: Response, next: NextFunction) => {

    const { pincode } = req.params;
    try {
        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true })
            .sort([["rating", "descending"]])
            .limit(10);

        if (result && result.length > 0) {
            res.status(200).json({ result });
        }
        else {

            res.status(404).json({ message: "No data found" }); // Fixed typo
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error Occured ", "error": error });
    }
}
export const GetFoodIn30Min = async (req: Request, res: Response, next: NextFunction) => {

    const { pincode } = req.params;

    const vendors = await Vendor.find({ pincode, serviceAvailable: true }).populate("food");

    const results = vendors.map(vendor =>
        vendor.food.filter((food: CreateFoodInput) => food.readyTime <= 30)
    );

    if (results.length > 0 && results != null) {
        res.status(200).json(results);
    }

    else {

        res.status(404).json({ message: "No data found" }); // Fixed typo
    }
}
export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const { pincode } = req.params;

    const vendors = await Vendor.find({ pincode, serviceAvailable: true }).populate("food");

    if (vendors != null && vendors.length > 0) {
        let foods: any = [];

        vendors.map(vendor => foods.push(...vendor.food));
        if (foods.length > 0 && foods != null) {
            res.status(200).json({ foods });
        }
        else {

            res.status(404).json({ message: "No foods found" }); // Fixed typo
        }
    }


    else {
        res.status(404).json({ message: "No foods found" });
    }
}
export const RestaurentById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const result = await Vendor.findById(id);
    if (result != null) {
        res.json(result);
    }
    else {

        res.json({ "message": "No data found" });
    }
}