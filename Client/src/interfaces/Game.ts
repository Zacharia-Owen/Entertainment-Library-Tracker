export interface Game {
    id: number;
    title: string;
    genre: string;
    releaseDate: Date;
    developer: string;
    publisher: string;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateGamePayload {
    title: string;
    genre: string;
    releaseDate: Date;
    developer: string;
    publisher: string;
}

export interface UpdateGamePayload {
    title?: string;
    genre?: string;
    releaseDate?: Date;
    developer?: string;
    publisher?: string;
    rating?: number | null;
}