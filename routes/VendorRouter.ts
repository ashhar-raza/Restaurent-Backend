import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorCoverImage, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controller';
import { Authenticate } from '../middlewares/CommonAuth';
import multer from 'multer';
const router = express.Router();


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "images");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now().toString()}-${file.originalname}`);
    }

});

const images = multer({ storage: imageStorage }).array('images', 10);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello Vendor Bro ");
})

router.post("/login", VendorLogin);

router.get("/profile", Authenticate, GetVendorProfile);

router.patch("/profile", Authenticate, UpdateVendorProfile);

router.patch("/service", Authenticate, UpdateVendorService);

router.patch("/VendorCoverImage", Authenticate, images, UpdateVendorCoverImage);
router.post("/food", Authenticate, images, AddFood);

router.get("/foods", Authenticate, GetFoods);
export { router as VendorRoute };