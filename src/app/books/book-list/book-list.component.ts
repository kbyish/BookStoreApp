import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { Book } from 'src/app/models/book.model';

import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit {
  books: Book[] = [{
    bookId: 1, title: "Book1", author: "Kifah Byish", category:
      "Life", price: 10.56, coverFileName: ' cover1.png'
  }];
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.getAll()
      .pipe(first())
      .subscribe(books => {
        this.books = books;

      });
  }

}
