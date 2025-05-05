import { NextFunction, Request, Response } from "express";
import { AuthTypePayload } from "../dto";
import { ValidateToken } from "../utility";

// Extend Express Request to include `user`
declare global {
    namespace Express {
        interface Request {
            user?: AuthTypePayload;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validate = await ValidateToken(req);

    if (validate) {
        req.user = validate;
       return next();
    }

     res.status(401).json({ message: "User not Authorized" });
};
