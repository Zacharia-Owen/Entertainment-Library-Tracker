import express from 'express';
import { Request, Response } from 'express';
import { Movies } from '../../models/movies';

const router = express.Router();

// Get all Movies
router.get('/', async (req: Request, res: Response) => {
    try {
        const movies = await Movies.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Movies not Found' });
    }
});

// Get a single Movie by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {const movie = await Movies.findByPk(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new Movie
router.post('/', async (req: Request, res: Response) => {
    try { const newMovie = await Movies.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Error Creating Movie' });
    }
});

// Update an existing Movie
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await Movies.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedMovie = await Movies.findByPk(req.params.id);
            res.json(updatedMovie);
        } else {
            res.status(404).json({ error: 'Movie not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Updating Movie' });
    }
});

// Delete a Movie
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Movies.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Movies not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Deleting Movies' });
    }
});

export default router;