import { Request, Response} from 'express';
import { Game } from '../models/games';

export const getAllGames = async (_req: Request, res: Response) => {
    try {
        const games = await Game.findAll();
        res.status(200).json(games);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving games',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getGameById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json(game);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving game',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


export const createGame = async (req: Request, res: Response) => {
    const { name, genre, releaseDate, rating, developer } = req.body;

    try {
        const newGame = await Game.create({
            name,
            genre,
            releaseDate,
            rating,
            developer,
        });

        res.status(201).json(newGame);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error creating game',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, genre, releaseDate, rating, developer } = req.body;

    try {
        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        await game.update({
            name,
            genre,
            releaseDate,
            rating,
            developer,
        });

        res.status(200).json(game);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error updating game',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export const deleteGame = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        await game.destroy();
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error deleting game',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
