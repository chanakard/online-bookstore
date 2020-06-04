import { BookService } from './services/book.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule,Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';

const routes:Routes = [
  {
    path : 'books',
    component : BookListComponent
  },
  {
    path : 'books/:id',
    component : BookDetailsComponent
  },
  {
    path : 'search/:keyword',
    component : BookListComponent
  },
  {
    path : 'category/:id',
    component : BookListComponent
  },
  {
    path : '',
    redirectTo : '/books',
    pathMatch : 'full'
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,RouterModule.forRoot(routes)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
