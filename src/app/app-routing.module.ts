import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const booksModule = () => import('./books/books.module').then(x => x.BooksModule);
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', loadChildren: booksModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
