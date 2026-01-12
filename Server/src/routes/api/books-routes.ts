import express from 'express';
import { Request, Response } from 'express';
import { Books } from '../../models/books';

const router = express.Router();

// Get all books
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Books.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Books not Found' });
    }
});

// Get a single books by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {const books = await Books.findByPk(req.params.id);
        if (books) {
            res.json(books);
        } else {
            res.status(404).json({ error: 'Books not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new books
router.post('/', async (req: Request, res: Response) => {
    try { const newbooks = await Books.create(req.body);
        res.status(201).json(newbooks);
    } catch (error) {
        res.status(500).json({ error: 'Error Creating Books' });
    }
});

// Update an existing books
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await Books.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedbooks = await Books.findByPk(req.params.id);
            res.json(updatedbooks);
        } else {
            res.status(404).json({ error: 'Books not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Updating Books' });
    }
});

// Delete a Books
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Books.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Books not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Deleting Books' });
    }
});

export default router;