import http from './Http';
import { Shows, CreateShowPayload, UpdateShowPayload } from '../interfaces/Show';

export const ShowsApi = {
    getAll: async (): Promise<Shows[]> => {
        const { data } = await http.get<Shows[]>('/shows');
        return data;
    },

    getById: async (id: number): Promise<Shows> => {
        const { data } = await http.get<Shows>(`/shows/${id}`);
        return data;
    },

    create: async (payload: CreateShowPayload): Promise<Shows> => {
        const { data } = await http.post<Shows>('/shows', payload);
        return data;
    },

    update: async (id: number, payload: UpdateShowPayload): Promise<Shows> => {
        const { data } = await http.put<Shows>(`/shows/${id}`, payload);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await http.delete<void>(`/shows/${id}`);
    },
};