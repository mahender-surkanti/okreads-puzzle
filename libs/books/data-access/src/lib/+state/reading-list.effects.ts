import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';
import {
  addToReadingList,
  removeFromReadingList,
} from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          tap(() => this.openSnackBar('Book Added', 'Undo', book, null)),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          tap(() => this.openSnackBar('Book Removed', 'Undo', null, item)),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  openSnackBar(
    message: string,
    action: string,
    item: Book,
    book: ReadingListItem
  ) {
    let snackbar = this.snackBar.open(message, action, {
      duration: 3000,
    });
    snackbar.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      if (item != null) {
        setTimeout(
          () =>
            this.store.dispatch(
              removeFromReadingList({
                item: {
                  bookId: item.id,
                  title: '',
                  authors: [],
                  description: '',
                },
              })
            ),
          2000
        );
      } else {
        setTimeout(
          () =>
            this.store.dispatch(
              addToReadingList({
                book: {
                  id: book.bookId,
                  title: book.title,
                  authors: book.authors,
                  description: book.description,
                  coverUrl: book.coverUrl,
                },
              })
            ),
          2000
        );
      }
    });
  }
}
