import express, { type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import rateLimit from "express-rate-limit";
// import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
// app.use(cookieParser());

// Login rate limiter
// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: { message: 'Too many login attempts, please try again later' },
//     standardHeaders: true,
//     legacyHeaders: false,
// });

// JWT Helpers
const generateAccessToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

const generateRefreshToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '', { expiresIn: '7d' });
};

// User signup
export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// User login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });

        }
        const token = generateAccessToken({ id: user.id, username: user.username });
        const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in prod
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Token refresh endpoint
app.post("/refresh", (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const token = generateAccessToken({ id: (user as any).id, username: (user as any).username });
        res.json({ token });
    });
});

// logout endpoint
app.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});