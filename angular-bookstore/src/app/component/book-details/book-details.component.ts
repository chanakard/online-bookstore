import { BookService } from './../../services/book.service';
import { Book } from './../../common/book';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
book:Book = new Book();
  constructor(private _activatedRoute:ActivatedRoute, private _bookService:BookService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() =>
      this.getBookInfo());
  }

  getBookInfo()
  {
    const id:number = +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.getBookInfo(id).subscribe(data => 
      {
        this.book = data;
      });
  }
}
