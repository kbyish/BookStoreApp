import { Author } from "./author";

export class Book {
    bookId: number;
    title: string;
    author: Author;
    category: string;
    price: number;
    coverFileName: string;
}
