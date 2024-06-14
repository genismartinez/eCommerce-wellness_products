import {Response} from "express";
import {constants} from "http2";

export const ErrorCommon = {
    ERR001: {
        code: "ErrorCommon.001",
        message: "Unexpected error",
    },
    ERR002: {
        code: "ErrorCommon.002",
        message: "Permission denied",
    },
    ERR003: {
        code: "ErrorCommon.003",
        message: "Invalid parameters",
    },
    ERR004: {
        code: "ErrorCommon.004",
        message: "Not found",
    },
    ERR005: {
        code: "ErrorCommon.005",
        message: "Invalid token",
    },
    ERR006: {
        code: "ErrorCommon.006",
        message: "No token provided",
    },
    ERR007: {
        code: "ErrorCommon.007",
        message: "Incorrect password",
    },
    ERR008: {
        code: "ErrorCommon.008",
        message: "Username already exists",
    },
    ERR009: {
        code: "ErrorCommon.009",
        message: "Email already exists",
    },
};

export interface IApiError {
    message: string;
    code?: string;
}

export class ApiError {
    constructor(
        error:
            | BBDDError
            | NotFoundError
            | NoTokenProvidedError
            | InvalidTokenError
            | IncorrectPasswordError
            | PermissionDeniedError
            | UsernameAlreadyExistsError
            | EmailAlreadyExistsError,
        res: Response
    ) {
        const returnError: IApiError = {
            message:
                error && error.message ? error.message : ErrorCommon.ERR001.message,
            code: error && error.code ? error.code : ErrorCommon.ERR001.code,
        };

        const statusCode = error
            ? error.statusCode
            : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
        res.status(statusCode).send(returnError);
    }
}

export class BBDDError extends Error {
    code: string = ErrorCommon.ERR001.code;
    query: string;
    parameters: any;
    statusCode: number = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

    constructor(bbddError: any) {
        super(bbddError);
        this.query = bbddError.query;
        this.parameters = bbddError.parameters;
    }
}

export class NotFoundError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR004.code;
        this.message = error?.message || ErrorCommon.ERR004.message;
    }
}

export class NoTokenProvidedError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR006.code;
        this.message = error?.message || ErrorCommon.ERR006.message;
    }
}

export class InvalidTokenError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR006.code;
        this.message = error?.message || ErrorCommon.ERR006.message;
    }
}

export class IncorrectPasswordError extends Error {
    code: string = ErrorCommon.ERR007.code;
    statusCode: number = constants.HTTP_STATUS_BAD_REQUEST;

    constructor() {
        super(ErrorCommon.ERR007.message);
    }
}

export class PermissionDeniedError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR002.code;
        this.message = error?.message || ErrorCommon.ERR002.message;
    }
}

export class UsernameAlreadyExistsError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR008.code;
        this.message = error?.message || ErrorCommon.ERR008.message;
    }
}

export class EmailAlreadyExistsError extends Error {
    readonly statusCode = constants.HTTP_STATUS_NOT_FOUND;
    code: string;
    message: string;

    constructor(error?: Partial<NotFoundError>) {
        super();
        this.code = error?.code || ErrorCommon.ERR009.code;
        this.message = error?.message || ErrorCommon.ERR009.message;
    }
}
