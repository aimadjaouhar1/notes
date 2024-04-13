import { createAction, props } from "@ngrx/store";
import { INote } from "@notes/shared-lib/interfaces/note.interface";

export const addNote = createAction('[Note] Add Note', props<{ note: Omit<INote, 'id' | 'status'> }>());
export const addNoteSuccess = createAction('[Note] Add Note Success', props<{ note: INote }>());
export const addNoteFailure = createAction('[Note] Add Note Failure');

export const getNotes = createAction('[Note] Get Notes');
export const getNotesSuccess = createAction('[Note] Get Notes Success', props<{ notes: INote[] }>());
export const getNoteFailure = createAction('[Note] Get Notes Failure', props<{ errorMessage: string }>());
