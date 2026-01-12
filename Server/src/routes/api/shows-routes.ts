import express from 'express';
import { Request, Response } from 'express';
import { TVShows } from '../../models/tvshows';

const router = express.Router();

// Get all Shows
router.get('/', async (req: Request, res: Response) => {
    try {
        const shows = await TVShows.findAll();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ error: 'Show not Found' });
    }
});

// Get a single Show by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {const show = await TVShows.findByPk(req.params.id);
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ error: 'Show not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new Show
router.post('/', async (req: Request, res: Response) => {
    try { const newShow = await TVShows.create(req.body);
        res.status(201).json(newShow);
    } catch (error) {
        res.status(500).json({ error: 'Error Creating Show' });
    }
});

// Update an existing Show
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await TVShows.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedShow = await TVShows.findByPk(req.params.id);
            res.json(updatedShow);
        } else {
            res.status(404).json({ error: 'Show not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Updating Show' });
    }
});

// Delete a Show
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await TVShows.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Show not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Deleting Show' });
    }
});

export default router;