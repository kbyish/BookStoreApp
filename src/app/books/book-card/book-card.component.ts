import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment'

import { PersonNamePipe } from 'src/app/pipes/person-name.pipe'
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  providers: [PersonNamePipe]
})
export class BookCardComponent implements OnInit {

  environment = environment;
  @Input()
  book: Book;
  constructor(private personName: PersonNamePipe) { }

  ngOnInit(): void {
  }

  loadErrorImage(event: any) {
    console.log('event=', event);
  }

}
