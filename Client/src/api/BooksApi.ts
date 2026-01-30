import http from './Http';
import { Book, CreateBookPayload, UpdateBookPayload } from '../interfaces/Book';

export const BooksApi = {
    getAll: async (): Promise<Book[]> => {
        const { data } = await http.get<Book[]>('/books');
        return data;
    },

    getById: async (id: number): Promise<Book> => {
        const { data } = await http.get<Book>(`/books/${id}`);
        return data;
    },

    create: async (payload: CreateBookPayload): Promise<Book> => {
        const { data } = await http.post<Book>('/books', payload);
        return data;
    },

    update: async (id: number, payload: UpdateBookPayload): Promise<Book> => {
        const { data } = await http.put<Book>(`/books/${id}`, payload);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await http.delete<void>(`/books/${id}`);
    },
};