import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { Author } from 'src/app/models/author';

import { Book } from 'src/app/models/book.model';
import { ResponseData } from 'src/app/models/response';

import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  param = { pageNumber: 1, pageSize: 8 };

  responseData!: ResponseData;
  author: Author = { id: 1, firstName: 'Kifah', lastName: 'Byish', gender: 'Male' };
  books: Book[] = [{
    bookId: 1, title: "Book1", author: this.author, category:
      "Life", price: 10.56, coverFileName: ' cover1.png'
  }];
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {

    this.getAll(this.param);
  }

  next() {
    if (this.responseData.pageNumber <= this.responseData.totalPages) {
      this.param.pageNumber = this.responseData.pageNumber + 1;
      this.getAll(this.param);
    }
  }

  prev() {
    if (this.responseData.pageNumber > 1) {
      this.param.pageNumber = this.responseData.pageNumber - 1;
      this.getAll(this.param);
    }
  }

  getAll(param: any) {
    this.bookService.getAll(param.pageNumber, param.pageSize)
      .pipe(first())
      .subscribe(response => {
        this.responseData = response;
        this.books = response.data;

      });
  }

}
