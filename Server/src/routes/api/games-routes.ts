import express from 'express';
import { Request, Response } from 'express';
import { Game } from '../../models/games';

const router = express.Router();

// Get all games
router.get('/', async (req: Request, res: Response) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Game not Found' });
    }
});

// Get a single game by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {const game = await Game.findByPk(req.params.id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ error: 'Game not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new game
router.post('/', async (req: Request, res: Response) => {
    try { const newGame = await Game.create(req.body);
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: 'Error Creating Game' });
    }
});

// Update an existing game
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await Game.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedGame = await Game.findByPk(req.params.id);
            res.json(updatedGame);
        } else {
            res.status(404).json({ error: 'Game not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Updating Game' });
    }
});

// Delete a game
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Game.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Game not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Deleting Game' });
    }
});

export default router;