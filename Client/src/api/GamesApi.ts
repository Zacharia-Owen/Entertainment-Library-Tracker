import http from './Http';
import { Game, CreateGamePayload, UpdateGamePayload } from '../interfaces/Game';

export const GamesApi = {
    getAll: async (): Promise<Game[]> => {
        const { data } = await http.get<Game[]>('/games');
        return data;
    },

    getById: async (id: number): Promise<Game> => {
        const { data } = await http.get<Game>(`/games/${id}`);
        return data;
    },

    create: async (payload: CreateGamePayload): Promise<Game> => {
        const { data } = await http.post<Game>('/games', payload);
        return data;
    },

    update: async (id: number, payload: UpdateGamePayload): Promise<Game> => {
        const { data } = await http.put<Game>(`/games/${id}`, payload);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await http.delete<void>(`/games/${id}`);
    },
};
