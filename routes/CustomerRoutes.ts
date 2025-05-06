import express, { Request, Response, NextFunction } from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOTP } from '../controller';
import { Authenticate } from '../middlewares/CommonAuth';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json("Hello Customer Bro ");
})

// Sign UP
router.post('/signup', CustomerSignUp);

// Login
router.post('/login', CustomerLogin);

// Authenticate
router.patch('/verify', Authenticate, CustomerVerify);


router.get('/otp', RequestOTP);

// Profile
router.get('/profile', GetCustomerProfile);

router.patch('/profile', EditCustomerProfile);

export { router as CustomerRoute };
