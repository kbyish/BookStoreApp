import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Book } from '../models/book.model';
import { Categories } from '../models/categories.model';
import { map, shareReplay } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/api/books/`;
//const baseUrl = `/api/books`;
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Categories[]>(baseUrl + 'GetCategoriesList').pipe(shareReplay(1));

  books$ = this.getAllBooks().pipe(shareReplay(1));

  getAll() {
    return this.http.get<Book[]>(baseUrl);
  }

  getAllBooks() {
    return this.http.get<Book[]>(baseUrl);
  }

  addBook(book: any) {
    return this.http.post(baseUrl, book);
  }

  getBookById(id: number) {
    return this.books$.pipe(map(book => book.find(b => b.bookId === id)));
  }

  getsimilarBooks(bookId: number) {
    return this.http.get<Book[]>(baseUrl + 'GetSimilarBooks/' + bookId);
  }

  updateBookDetails(book: any) {
    return this.http.put(baseUrl, book);
  }

  deleteBook(id: number) {
    return this.http.delete(baseUrl + id);
  }


}
