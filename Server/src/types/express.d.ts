import { Request } from 'express';

interface JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}