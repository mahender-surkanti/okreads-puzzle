import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import {Observable,  of} from 'rxjs';
import {debounceTime,tap,switchMap,filter, map, startWith, distinctUntilChanged} from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

import { Book,ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';


@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit,OnDestroy {
  books: ReadingListBook[];


  subscription : Subscription;

  searchForm = this.fb.group({
    term: ''
  });
  item : ReadingListItem;
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    
  ) {}
  

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.subscription=this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.onChanges();
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    
    this.item ={
      bookId:'',
      title:'',
      authors:[],
      description:''
  
    };;
    this.item.bookId=book.id;
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar("Book Added!!","Undo");
   
  }
  onChanges(){
    this.searchForm.get('term').valueChanges.pipe(
        filter( data => data.trim().length > 0 ),
        debounceTime(500),
        switchMap((id: string) => {
       return id ? of(this.store.dispatch(searchBooks({ term: id }))) : of([]);
     })
    ).subscribe(data =>{
      
    })
  }
  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }


  openSnackBar(message: string, action: string) {
    const snackbar=this.snackBar.open(message, action,{
      duration: 3000
    });
    snackbar.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      this.store.dispatch(removeFromReadingList({item:this.item} ));
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe();
  }
}
