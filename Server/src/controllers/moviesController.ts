import { Request, Response } from 'express';
import { Movies } from '../models/movies';

export const getAllMovies = async (_req: Request, res: Response) => {
    try {
        const movies = await Movies.findAll();
        res.status(200).json(movies);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving movies',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const movie = await Movies.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error retrieving movie',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const createMovie = async (req: Request, res: Response) => {
    const { title, director, genre, rating, releaseYear } = req.body;

    try {
        const newMovie = await Movies.create({
            title,
            director,
            genre,
            rating,
            releaseYear,
        });
        res.status(201).json(newMovie);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error creating movie',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, director, genre, rating, releaseYear } = req.body;

    try {
        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        movie.title = title;
        movie.director = director;
        movie.genre = genre;
        movie.rating = rating;
        movie.releaseYear = releaseYear;

        await movie.save();
        res.status(200).json(movie);
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Error updating movie',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await movie.destroy();
        res.status(200).json({ message: 'Movie deleted successfully' });
    }
    catch (error: unknown) {
        res.status(500).json({
            message: 'Error deleting movie',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};