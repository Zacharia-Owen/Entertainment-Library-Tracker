export interface Movie {
    id: number;
    title: string;
    director: string;
    releaseDate: Date;
    genre: string;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMoviePayload {
    title: string;
    director: string;
    releaseDate: Date;
    genre: string;
}

export interface UpdateMoviePayload {
    title?: string;
    director?: string;
    releaseDate?: Date;
    genre?: string;
    rating?: number | null;
}