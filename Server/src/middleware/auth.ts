import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
}

export const authenticate = ( req: Request, res: Response, next: NextFunction
) => { const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    };
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
