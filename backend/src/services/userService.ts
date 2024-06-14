import "dotenv/config";
import {Request, Response, NextFunction} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {UserSchema} from "../entity/user";
import AppDataSource from "../database";
import {GenericService} from "./genericService";
import {AuthError, ValidationError, ErrorHandler} from "../middleware/errorHandler";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "fsibeifseFsefsngD";

export class UserService extends GenericService<UserSchema> {
    constructor() {
        super(UserSchema);
    }

    isTokenValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const sessionCookies = req.cookies.token;

        if (!sessionCookies) {
            return next(new AuthError("No token provided"));
        }
        try {
            jwt.verify(sessionCookies, JWT_SECRET_KEY);
            res.json({message: "Token is valid"});
        } catch (error) {
            if (error instanceof Error) {
                return next(new AuthError(error.message));
            } else {
                return next(new AuthError("Invalid token"));
            }
        }
    }

    signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {username, password, email} = req.body;
            const userRepository = AppDataSource.getRepository(UserSchema);

            const existingUser = await userRepository.findOneBy({username});
            if (existingUser) {
                return next(new ValidationError("Username already exists"));
            }

            const hashedPassword = bcrypt.hashSync(password, 8);
            const user = new UserSchema();
            user.username = username;
            user.password = hashedPassword;
            user.email = email;

            await userRepository.save(user);
            res.status(201).json({message: "User registered successfully"});
        } catch (error) {
            if (error instanceof Error) {
                return next(new ErrorHandler(500, error.message));
            } else {
                return next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {username, password} = req.body;
            const userRepository = AppDataSource.getRepository(UserSchema);

            const user = await userRepository.findOneBy({username});
            if (!user) {
                return next(new AuthError("User not found"));
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return next(new AuthError("Invalid password"));
            }

            const token = jwt.sign({sub: user.id}, JWT_SECRET_KEY, {
                expiresIn: 86400,
            });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400 * 1000,
                sameSite: "strict",
            });
            res.json({token, email: user.email});
        } catch (error) {
            if (error instanceof Error) {
                return next(new ErrorHandler(500, error.message));
            } else {
                return next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }
}
