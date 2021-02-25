import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { Author } from 'src/app/models/author';

import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/categories.model';

import { ResponseData } from 'src/app/models/response';

import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  //form
  private formData = new FormData();
  bookForm: FormGroup;

  param = { pageNumber: 1, pageSize: 4, title: '', categories: '' };

  responseData!: ResponseData;
  author: Author = { id: 1, firstName: 'Kifah', lastName: 'Byish', gender: 'Male' };
  books: Book[] = [{
    bookId: 1, title: "Book1", author: this.author, category:
      "Life", price: 10.56, coverFileName: '001.jpg'
  }];

  categories: Category[] = [];

  constructor(private bookService: BooksService,
    private fb: FormBuilder) {

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      categories: [],

    });
  }
  ngOnInit(): void {


    this.bookService.getCategories()
      .pipe()
      .subscribe(response => {
        this.categories = response;
      });

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
    this.bookService.getAll(param)
      .pipe(first())
      .subscribe(response => {
        this.responseData = response;
        this.books = response.data;

      });
  }


  onFormSubmit() {


    this.formData.append('bookFormData', JSON.stringify(this.bookForm.value));
    console.log('this.bookForm.value=', this.bookForm.value);
    this.param.pageNumber = 1;

    this.param.title = this.bookForm.value.title;
    this.param.categories = this.bookForm.value.categories?.toString();
    console.log('onFormSubmit()::param', this.param);
    this.getAll(this.param);

  }

}
