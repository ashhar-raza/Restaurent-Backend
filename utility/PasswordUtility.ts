import bcrypt from 'bcrypt';
import { AuthTypePayload, VendorTokenPayload } from '../dto';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request } from 'express';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ComparePassword = async (password: string, userPassword: string) => {
    return bcrypt.compare(password, userPassword);
}

export const GenerateToken = async (data: AuthTypePayload) => {
    return jsonwebtoken.sign(data, SECRET_KEY, { expiresIn: '1d' });
}

export const ValidateToken = async (req: Request) => {
    const token = req.get("Authorization");
    if (token) {

        try {
            const payload = jsonwebtoken.verify(token.split(' ')[1], SECRET_KEY) as AuthTypePayload;
            return payload;
        } catch (error) {
            return null;
        }
    }
    return null;
}