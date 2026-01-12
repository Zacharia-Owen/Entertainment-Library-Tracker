import express, { type Request, type Response } from 'express';
import { User } from '../models/users.ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

        // can change this to use username or emial with the code of 
        //     try {
        // const { username, email, password } = req.body;
        // const user = await User.findOne({ 
        //     where: { 
        //         [Op.or]: [
        //             { username },
        //             { email }
        //         ]
        //     } 
        // });
export const login = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ where: {username} });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};