export interface Shows {
    id: number;
    title: string;
    creator: string;
    releaseDate: Date;
    genre: string;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateShowPayload {
    title: string;
    creator: string;
    releaseDate: Date;
    genre: string;
}

export interface UpdateShowPayload {
    title?: string;
    creator?: string;
    releaseDate?: Date;
    genre?: string;
    rating?: number | null;
}