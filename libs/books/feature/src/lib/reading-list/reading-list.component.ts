import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
  updateToReadingList,
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  //we need to add finish date and finished flag true So including that in the update to readingList effect
  finishedBook(item: ReadingListItem) {
    this.store.dispatch(
      updateToReadingList({
        readingItem: {
          bookId: item.bookId,
          authors: item.authors,
          publisher: item.publisher,
          title: item.title,
          description: item.description,
          coverUrl: item.coverUrl,
          finished: true,
          finishedDate: new Date().toLocaleDateString(),
        },
      })
    );
  }
}
