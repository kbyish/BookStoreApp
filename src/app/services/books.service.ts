import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Book } from '../models/book.model';
import { Category } from '../models/categories.model';
import { map, shareReplay } from 'rxjs/operators';

import { ResponseData } from '../models/response';

const baseUrl = `${environment.apiUrl}/api/book/`;
//const baseUrl = `/api/books`;
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Category[]>(baseUrl + 'GetCategoriesList').pipe(shareReplay(1));

  books$ = this.getAllBooks().pipe(shareReplay(1));
  response: any;

  //    pageNumber: number; pageSize: number;
  getAll(param: any) {

    let paramString: string = `?pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`;
    if (param?.title) {
      paramString += `&title=${param.title}`
    }
    if (param?.categories) {
      paramString += `&category=${param.categories}`
    }
    return this.http.get<ResponseData>(baseUrl + paramString);
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


  getCategories() {
    return this.http.get<Category[]>(baseUrl + 'GetCategories').pipe(shareReplay(1));
  }
}
