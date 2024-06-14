import {NextFunction, Request, Response} from "express";

export class ErrorHandler extends Error {
    public statusCode: number;
    public message: string;
    public error: string | null;

    constructor(statusCode: number, message: string, error: string | null = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

export class AuthError extends ErrorHandler {
    constructor(message: string, error: string | null = null) {
        super(401, message, error);
    }
}

export class ValidationError extends ErrorHandler {
    constructor(message: string, error: string | null = null) {
        super(400, message, error);
    }
}

export const handleError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const {statusCode, message, error} = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        error,
    });
};
