import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: number; username: string };
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'id' in decoded &&
            'username' in decoded &&
            typeof (decoded as any).id === 'number' &&
            typeof (decoded as any).username === 'string'
        ) {
            req.user = { id: (decoded as any).id, username: (decoded as any).username };
            next();
        } else {
            return res.sendStatus(403);
        }
    });
};

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    // Additional authorization logic can be added here
    next();
};