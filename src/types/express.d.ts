declare interface JWTPayload {
    id?: number;
}
declare namespace Express {
    export interface Request {
        user?: JWTPayload;
    }
}
