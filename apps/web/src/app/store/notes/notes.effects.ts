import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as NotesActions from './notes.actions';
import { of } from 'rxjs';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { NoteHttp } from '../../_core/http/note.http';

@Injectable()
export class NoteEffects {

constructor(
    private readonly actions$: Actions, 
    private readonly noteHttp: NoteHttp
) {}

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

  getNotes$ = createEffect(() => 
    this.actions$.pipe(
      ofType(NotesActions.getNotes),
      switchMap(() => this.noteHttp.getNotes().pipe(
        map((notes) => NotesActions.getNotesSuccess({ notes })),
        catchError((error) => of(NotesActions.getNoteFailure({ errorMessage: error })))
      )) 
    )
  );

}