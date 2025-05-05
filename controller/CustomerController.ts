import express, { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs } from '../dto';
import { GeneratePassword, GenerateSalt } from '../utility';
import { Customer } from '../modals/Customer';
export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInputs, req.body);

    const inputErrors = await validate(customerInputs, { validationError: { target: false } });

    if (inputErrors.length > 0) {
        res.status(400).json(inputErrors);
    }


    const { email, phone, password } = customerInputs;

    const salt = await GenerateSalt();
    const inputpassword = await GeneratePassword(password, salt);

    const otp = 567892;
    const otp_expiry = new Date();

    const result = await Customer.create({
        email: email,
        password: inputpassword,
        phone: phone,
        otp: otp,
        otp_expiry: otp_expiry,
        salt: salt,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0
    });

    res.status(200).json(result);
}
export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

}
export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {

}
export const RequestOTP = async (req: Request, res: Response, next: NextFunction) => {

}
export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}
export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}