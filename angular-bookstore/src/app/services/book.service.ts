import { BookCategory } from './../common/book-category';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";
  constructor(private httpClient:HttpClient) { }

  getBooks(theCategoryId : number) : Observable<Book[]>
  {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBookList(searchUrl);
  }


  getBookCategories() : Observable<BookCategory[]>
  {
    return this.httpClient.get<getResponseBookCategory>(this.categoryUrl).pipe(
map(response =>  response._embedded.bookCategory)
    );
  }


  searchBooks(keyword : string) : Observable<Book[]>
  {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBookList(searchUrl);
  }

  private getBookList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<getResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookInfo(bookId:number) : Observable<Book>
  {
      const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
      return this.httpClient.get<Book>(bookDetailsUrl);
  }
}

interface getResponseBooks
{
  _embedded:{
    books:Book[]
  }
}


interface getResponseBookCategory
{
  _embedded:{
    bookCategory:BookCategory[]
  }
}
