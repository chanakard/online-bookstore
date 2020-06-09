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

  getBooks(theCategoryId : number, currenPage:number, pageSize:number) : Observable<getResponseBooks>
  {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currenPage}&size=${pageSize}`;
    console.log('searchUrl'+searchUrl);
    return this.httpClient.get<getResponseBooks>(searchUrl);
  }


  getBookCategories() : Observable<BookCategory[]>
  {
    return this.httpClient.get<getResponseBookCategory>(this.categoryUrl).pipe(
map(response =>  response._embedded.bookCategory)
    );
  }


  searchBooks(keyword : string,currentPage:number, pageSize:number) : Observable<getResponseBooks>
  {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<getResponseBooks>(searchUrl);
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
  },
  page:{    
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}


interface getResponseBookCategory
{
  _embedded:{
    bookCategory:BookCategory[]
  }  
}
