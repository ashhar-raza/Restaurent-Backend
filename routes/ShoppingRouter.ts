import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailablity, GetFoodIn30Min, GetTopRestaurents, RestaurentById, SearchFoods } from '../controller';

const router = express.Router();

router.get("/:pincode", GetFoodAvailablity);
router.get("/top-restaurents/:pincode", GetTopRestaurents);
router.get("/food-in-30-min/:pincode", GetFoodIn30Min);
router.get("/search/:pincode", SearchFoods);
router.get("/restaurent/:id", RestaurentById);

export { router as ShoppingRoute };