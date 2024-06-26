import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as NotesActions from './notes.actions';
import { NoteHttp } from '../../_core/http/note.http';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NoteEffects {

  private readonly actions$ = inject(Actions);
  private readonly modalService = inject(NgbModal);
  private readonly noteHttp =  inject(NoteHttp);

  private readonly defaultError = 'Internal server error!';

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      switchMap(({ note }) =>
        this.noteHttp.addNote(note).pipe(
          map(createdNote => NotesActions.addNoteSuccess({ note: createdNote })),
          catchError(() => of(NotesActions.addNoteFailure()))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      switchMap(({ note }) =>
        this.noteHttp.deleteNote(note).pipe(
          map(() => NotesActions.deleteNoteSuccess()),
          catchError(() => of(NotesActions.deleteNoteFailure()))
        )
      )
    )
  );

  getNotes$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotesActions.getNotes),
      switchMap(() => this.noteHttp.getNotes().pipe(
        map((notes) => NotesActions.getNotesSuccess({ notes })),
        catchError((err) => of(NotesActions.getNotesFailure({ errorMessage: err.error || this.defaultError })))
      )) 
    )
  );

  searchNotes$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotesActions.searchNote),
      switchMap(({ searchQuery }) => this.noteHttp.getNotes(searchQuery).pipe(
        map((notes) => NotesActions.searchNoteSuccess({ notes })),
        catchError((err) => of(NotesActions.searchNoteFailure({ errorMessage: err.error || this.defaultError })))
      )) 
    )
  );

  closeAddNoteModal$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotesActions.addNoteSuccess),
      tap(() => this.modalService.dismissAll())
    ),
    {dispatch: false}
  );

  closeDeleteNoteModal$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      tap(() => this.modalService.dismissAll())
    ),
    {dispatch: false}
  );

}