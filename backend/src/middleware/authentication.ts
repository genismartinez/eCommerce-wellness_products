import "dotenv/config";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {AuthError} from "./errorHandler";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const sessionCookies = req.cookies.token;

    if (!sessionCookies) {
        return next(new AuthError("No token provided!"));
    }

    try {
        jwt.verify(sessionCookies, SECRET_KEY) as JwtPayload;
        next();
    } catch (error) {
        if (error instanceof Error) {
            return next(new AuthError("Invalid token!", error.message));
        } else {
            return next(new AuthError("Invalid token!", "Unknown error"));
        }
    }

};

export const getUserIdFromToken = (req: Request): string => {
    const token = req.cookies.token;
    console.log(token)
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded.sub as string;
}

