import { Request, Response } from 'express';
import { TVShows } from '../models/tvshows';
import { Movies } from '../models/movies';

export const getAllShows = async (_req: Request, res: Response) => {
    try {
        const shows = await TVShows.findAll();
        res.status(200).json(shows);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving shows',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getShowById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const show = await TVShows.findByPk(id);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        res.status(200).json(show);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving show',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const createShow = async (req: Request, res: Response) => {
    const { title, genre, rating, seasons, network } = req.body;

    try {
        const newShow = await TVShows.create({
            title,
            genre,
            rating,
            seasons,
            network
        });
        res.status(201).json(newShow);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error creating show',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateShow = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, genre, rating, seasons, network } = req.body;

    try {
        const show = await TVShows.findByPk(id);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }
        show.title = title;
        show.genre = genre;
        show.rating = rating;
        show.seasons = seasons;
        show.network = network;

        await show.save();
        res.status(200).json(show);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error updating show',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const deleteShow = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const show = await TVShows.findByPk(id);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }
        await show.destroy();
        res.status(200).json({ message: 'Show deleted successfully' });
    }
    catch (error: unknown) {
        res.status(500).json({
            message: 'Error deleting show',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};