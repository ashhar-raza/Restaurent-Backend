import { IsEmail, Length } from "class-validator";

export class CreateCustomerInputs {
    @IsEmail()
    email: string;

    @Length(7, 12)
    phone: string;

    @Length(7, 12)
    password: string;
}
export class CustomerLogginInputs {
    @IsEmail()
    email: string;

    @Length(7, 12)
    password: string;
}

export interface CustomerPayLoad {

    _id: string;
    email: string;
    verified: boolean;
} 
