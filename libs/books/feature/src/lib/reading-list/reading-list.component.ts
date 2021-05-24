import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList,getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book,ReadingListItem } from '@tmo/shared/models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  
  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item : ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    
  }
}
