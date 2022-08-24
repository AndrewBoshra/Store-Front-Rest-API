import validator from "validator";
import { RequiredFieldError, ValidationError } from "./errors/error";
export function requiredFieldValidator<T>(
    v: T | undefined,
    fieldName: string
): T {
    if (v === undefined) throw new RequiredFieldError(fieldName);
    return v;
}

function emailValidator(v: unknown, fieldName: string): string {
    const email = `${v}`;
    const valid = validator.isEmail(email);
    if (!valid)
        throw new ValidationError(fieldName, `${email} is not a valid email`);
    return email;
}

export function strongPasswordValidator(
    password: string,
    fieldName: string,
    opts: validator.strongPasswordOptions = {
        minLength: 6,
    }
): string {
    const valid = validator.isStrongPassword(password, opts);
    if (!valid)
        throw new ValidationError(
            fieldName,
            `${password} is not a strong password`
        );
    return password;
}
export function numberValidator(n: string | number, fieldName: string): number {
    const num = parseInt(`${n}`);
    if (isNaN(num))
        throw new ValidationError(
            fieldName,
            `${fieldName} is not a valid number`
        );
    return num;
}

export function idValidator(
    n: string | number | undefined,
    fieldName: string
): number {
    let val = n;
    val = requiredFieldValidator(val, fieldName);
    return numberValidator(val, fieldName);
}

export function notEmpty(v: string, fieldName: string): string {
    const str = v.trim();
    if (str.length === 0) {
        throw new ValidationError(fieldName, "can't be empty");
    }
    return str;
}

export function priceValidator(p: number, fieldName: string): number {
    if (p < 0) {
        throw new ValidationError(fieldName, "can't be negative");
    }
    return p;
}

export function minValueValidator(
    p: number,
    fieldName: string,
    minVal = 0
): number {
    if (p <= minVal) {
        throw new ValidationError(fieldName, `can't be less than ${minVal}`);
    }
    return p;
}

export function requiredEmailValidator(
    e: string | undefined,
    fieldName: string
): string {
    return compose<string>(
        fieldName,
        requiredFieldValidator,
        emailValidator
    )(e);
}

export function compose<T>(
    fieldName: string,
    ...validators: ((v: any, fieldName: string) => T)[]
): (value: any) => T {
    return (value: any) => {
        for (const v of validators) {
            value = v(value, fieldName);
        }
        return value;
    };
}
