import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Book } from '../models/book.model';

const baseUrl = `${environment.apiUrl}/api/books`;
//const baseUrl = `/api/books`;
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Book[]>(baseUrl);
  }
}
