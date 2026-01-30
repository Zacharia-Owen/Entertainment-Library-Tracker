import http from './Http';
import { Movie, CreateMoviePayload, UpdateMoviePayload } from '../interfaces/Movie';

export const MoviesApi = {
    getAll: async (): Promise<Movie[]> => {
        const { data } = await http.get<Movie[]>('/movies');
        return data;
    },

    getById: async (id: number): Promise<Movie> => {
        const { data } = await http.get<Movie>(`/movies/${id}`);
        return data;
    },

    create: async (payload: CreateMoviePayload): Promise<Movie> => {
        const { data } = await http.post<Movie>('/movies', payload);
        return data;
    },

    update: async (id: number, payload: UpdateMoviePayload): Promise<Movie> => {
        const { data } = await http.put<Movie>(`/movies/${id}`, payload);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await http.delete<void>(`/movies/${id}`);
    },
};