import { Request, Response} from 'express';
import { Books } from '../models/books';

export const getAllBooks = async (_req: Request, res: Response) => {
    try {
        const books = await Books.findAll();
        res.status(200).json(books);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving books',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Books.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving book',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


export const createBook = async (req: Request, res: Response) => {
    const { title, author, genre, rating, publicationYear, developer } = req.body;

    try {
        const newBook = await Books.create({
            title,
            author,
            genre,
            rating,
            publicationYear,
        });

        res.status(201).json(newBook);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error creating book',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, genre, rating, publicationYear } = req.body;

    try {
        const book = await Books.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.update({
            title,
            author,
            genre,
            publicationYear,
            rating,
        });

        res.status(200).json(book);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error updating book',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export const deleteGame = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Books.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.destroy();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error deleting book',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};