import { createAction, props } from "@ngrx/store";
import { INote } from "@notes/shared-lib/interfaces/note.interface";

export const addNote = createAction('[Note] Add Note', props<{ note: Omit<INote, 'id' | 'status'> }>());
export const addNoteSuccess = createAction('[Note] Add Note Success', props<{ note: INote }>());
export const addNoteFailure = createAction('[Note] Add Note Failure');

export const getNotes = createAction('[Note] Get Notes');
export const getNotesSuccess = createAction('[Note] Get Notes Success', props<{ notes: INote[] }>());
export const getNotesFailure = createAction('[Note] Get Notes Failure', props<{ errorMessage: string }>());

export const deleteNote = createAction('[Note] Delete Note', props<{ note: INote }>());
export const deleteNoteSuccess = createAction('[Note] Delete Note Success');
export const deleteNoteFailure = createAction('[Note] Delete Note Failure');

export const searchNote = createAction('[Note] Search Note', props<{ searchQuery: string }>());
export const searchNoteSuccess = createAction('[Note] Search Note Success', props<{ notes: INote[] }>());
export const searchNoteFailure = createAction('[Note] Search Note Failure', props<{ errorMessage: string }>());