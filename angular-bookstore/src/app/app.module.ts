import { JwPaginationComponent } from 'jw-angular-pagination';
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
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

 
const routes:Routes = [
  {
    path : 'check-out',
    component : CheckoutComponent
  },
  {
    path : 'cart-details',
    component : CartDetailsComponent
  },
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
    BookDetailsComponent,
    JwPaginationComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,RouterModule.forRoot(routes),NgbModule,NgxSpinnerModule,BrowserAnimationsModule,ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
