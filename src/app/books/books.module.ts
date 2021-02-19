import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { NgMaterialModule } from '../ng-material/ng-material-module'


import { BooksRoutingModule } from './books-routing.module';
import { BookLayoutComponent } from './book-layout/book-layout.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCardComponent } from './book-card/book-card.component';

import { PersonNamePipe } from 'src/app/pipes/person-name.pipe'

@NgModule({
  declarations: [BookLayoutComponent, BookFormComponent, BookListComponent, BookCardComponent, PersonNamePipe],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule
  ]
})
export class BooksModule { }
