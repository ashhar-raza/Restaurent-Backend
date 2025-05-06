import express, { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs, CustomerLogginInputs } from '../dto';
import { ComparePassword, GenerateOTP, GeneratePassword, GenerateSalt, GenerateToken, requestOTP } from '../utility';
import { Customer } from '../modals/Customer';
export const CustomerSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {

    const customerInputs = plainToClass(CreateCustomerInputs, req.body);

    const inputErrors = await validate(customerInputs, {
        validationError: { target: false },
    });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors); // ✅ return here
    }

    const { email, phone, password } = customerInputs;

    const existingCustomer = await Customer.findOne({ email: email });

    if (existingCustomer !== null) {
        return res.status(409).json({ message: "User with email already exists" }); // ✅ return here
    }

    const salt = await GenerateSalt();
    const inputpassword = await GeneratePassword(password, salt);

    const { otp, expiry } = GenerateOTP();

    const result = await Customer.create({
        email: email,
        password: inputpassword,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        salt: salt,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
    });

    if (result) {
        try {
            const otpResponse = await requestOTP(otp, phone);

            const accessToken = await GenerateToken({
                _id: result._id.toString(),
                email: result.email,
                verified: result.verified,
            });

            return res.status(200).json({
                accessToken,
                email: result.email,
                verified: result.verified,
            }); // ✅ return here
        } catch (error) {
            return res.status(500).json({ error: "Failed to send OTP" }); // ✅ return here
        }
    } else {
        return res.status(400).json({ error: "Error creating customer" }); // ✅ return here
    }
};

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const loginInputs = plainToClass(CustomerLogginInputs, req.body);
    const inputErrors = await validate(loginInputs, {
        validationError: { target: false },
    });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors); // ✅ return here
    }
    const { email, password } = loginInputs;
    const user = await Customer.findOne({ email: email });
    if (user) {

        const result = await ComparePassword(password, user?.password);
        if (result) {
            const accessToken = await GenerateToken({
                _id: user._id,
                email: user.email,
                verified: user.verified
            })
            return res.json({ "message": "Logged In Successfully", "accessToken": accessToken });
        }
        return res.status(401).json({ "message": "Inccorect Password" });
    }
    return res.status(404).json({ "message": "No users found" });

}
export const CustomerVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const customer = req.user;
    const { otp } = req.body;

    if (!customer) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Customer.findById(customer._id);

    if (!user) {
        return res.status(404).json({ message: "No user found" });
    }

    const isOtpValid =
        user.otp === parseInt(otp) && user.otp_expiry > new Date();

    if (!isOtpValid) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    user.verified = true;
    const updatedUser = await user.save();

    return res.status(200).json({
        _id: updatedUser._id,
        email: updatedUser.email,
        verified: updatedUser.verified,
    });
};

export const RequestOTP = async (req: Request, res: Response, next: NextFunction) => {

}
export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}
export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}