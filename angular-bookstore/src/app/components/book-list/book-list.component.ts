import { BookService } from './../../services/book.service';
import { Book } from './../../common/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private _bookService: BookService, private _activatedRoutes: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoutes.paramMap.subscribe(() =>
      this.listBooks());
  }

  listBooks() {
    this.searchMode = this._activatedRoutes.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchBook();
    }
    else {
      this.handleListBook();
    }
  }

  handleListBook() {
    const hasCategoryId: boolean = this._activatedRoutes.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoutes.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 3;
    }
    this._bookService.getBooks(this.currentCategoryId).subscribe(
      data => this.books = data
    );
  }


  handleSearchBook() {

    const Keyword: string = this._activatedRoutes.snapshot.paramMap.get('keyword');


    this._bookService.searchBooks(Keyword).subscribe(
      data => 
      {this.books = data;
      console.log(data);}
    );
  }

}
