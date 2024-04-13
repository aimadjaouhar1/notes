import { createReducer, on } from "@ngrx/store";
import { INote } from "@notes/shared-lib/interfaces/note.interface";
import * as NotesActions from './notes.actions';
import { NoteStatus } from "@notes/shared-lib/enums";

export interface NotesState {
    notes: INote[];
  }
  
export const initialState: NotesState = {
    notes: []
};
  
export const notesReducer = createReducer(
    initialState,

    on(NotesActions.addNote, (state, { note }) => ({
      ...state,
      notes: [...state.notes, {...note, id: -1, status: NoteStatus.CREATED}]
    })),

    on(NotesActions.addNoteSuccess, (state, { note }) => {
        return {
          ...state,
          notes: state.notes.map(existingNote => existingNote.id === -1 ? { ...note, id: note.id } : existingNote)
        };
    }),

    on(NotesActions.addNoteFailure, (state, {}) => {
        return {
          ...state,
          notes: state.notes.filter(existingNote => existingNote.id !== -1)
        };
    })
);
