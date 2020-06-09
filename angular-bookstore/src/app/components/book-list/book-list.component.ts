import { BookService } from './../../services/book.service';
import { Book } from './../../common/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentCategoryId: number=1;
  searchMode: boolean=false;
  previouseCategoryId:number=1;

  //new properties for server side paging
  currentPage:number=0;
  pageSize:number=2;
  totalRecords:number=0;



  constructor(private _bookService: BookService, private _activatedRoutes: ActivatedRoute, private _ngbPagConfig : NgbPaginationConfig) {
    this._ngbPagConfig.maxSize = 3;
   }

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
      this.currentCategoryId = 1;
    }

    if(this.previouseCategoryId != this.currentCategoryId){
        this.currentPage=1;
    }

    //setting up the page number to one if the user navidate to a different category
    this.previouseCategoryId=this.currentCategoryId;

    this._bookService.getBooks(this.currentCategoryId,this.currentPage-1,this.pageSize).subscribe(
      this.processPaginate()
    );
  }


  handleSearchBook() {
 
    const Keyword: string = this._activatedRoutes.snapshot.paramMap.get('keyword');


    this._bookService.searchBooks(Keyword, this.currentPage -1,this.pageSize).subscribe(
      this.processPaginate()
    );
  }



  updatePageSize(pageSize:number)
  {
    this.pageSize=pageSize;
    this.listBooks();
  }

  processPaginate()
  {
    return data => {
      this.books = data._embedded.books;

      //page number starts from 1 index here
      this.currentPage = data.page.number+1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
}
