export abstract class AppError {
    constructor(public message: string) {}
}
export class AuthenticationError extends AppError {
    constructor(msg: string) {
        super(msg);
    }
}
export class AuthorizationError extends AppError {
    constructor(msg: string) {
        super(msg);
    }
}

export class ValidationError extends AppError {
    constructor(public fieldName: string, msg: string) {
        super(`${fieldName} ${msg}`);
    }
}

export class RequiredFieldError extends ValidationError {
    constructor(public fieldName: string, msg = "is required") {
        super(fieldName, msg);
    }
}
