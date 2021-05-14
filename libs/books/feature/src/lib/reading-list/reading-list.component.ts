import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList,getReadingList, removeFromReadingList,updateToReadingList } from '@tmo/books/data-access';
import { Book,ReadingListItem } from '@tmo/shared/models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  book:Book;
  readingItem:ReadingListItem;
  readingItems:ReadingListItem[];
  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.select(getReadingList).subscribe(books => {
      this.readingItems = books;
    });
  
  }
  removeFromReadingList(item : ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    
    this.book={
      id:'',
      title:'', 
      authors:[],
      description:'',
      coverUrl:'',
      publisher:''
    }
    this.book.id=item.bookId;
    this.book.authors=item.authors;
    this.book.title=item.title;
    this.book.description=item.description;
    this.book.coverUrl=item.coverUrl;
    this.book.publisher=item.publisher;
    
    this.openSnackBar('Book Removed','Undo');
  }
  openSnackBar(message: string, action: string) {
    let snackbar=this.snackBar.open(message, action,{
      duration: 3000
    });
    
    snackbar.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({book:this.book} ));
    });
   
  }
  finishedBook(item:ReadingListItem)
  {
    this.readingItem={
    bookId:item.bookId,
    title:item.title, 
    authors:item.authors,
    description:item.description,
    coverUrl:item.coverUrl,
    publisher:item.publisher,
    finished:true,
    finishedDate:new Date().toLocaleDateString()
    }
    this.store.dispatch(updateToReadingList({readingItem:this.readingItem}));
  }
}
