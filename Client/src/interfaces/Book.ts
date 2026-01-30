export interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: Date;
    isbn: string;
    pages: number;
    publisher: string;
    rating: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookPayload {
    title: string;
    author: string;
    publishedDate: Date;
    isbn: string;
    pages: number;
    publisher: string;
}

export interface UpdateBookPayload {
    title?: string;
    author?: string;
    publishedDate?: Date;
    isbn?: string;
    pages?: number;
    publisher?: string;
    rating?: number | null;
}