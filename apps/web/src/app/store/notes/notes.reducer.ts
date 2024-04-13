import { createReducer, on } from "@ngrx/store";
import { INote } from "@notes/shared-lib/interfaces/note.interface";
import * as NotesActions from './notes.actions';
import { NoteStatus } from "@notes/shared-lib/enums";
import { NotesState, NotesStateStatus } from "./notes.state";
  
export const initialState: NotesState = {
    status: NotesStateStatus.INITIAL,
    errorMessage: null,
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
    }),

    on(NotesActions.getNotes, (state, { }) => ({
      ...state,
      status: NotesStateStatus.LOADING,
    })),

    on(NotesActions.getNotesSuccess, (state, { notes }) => ({
      ...state,
      notes: [...notes],
      errorMessage: null,
      status: NotesStateStatus.SUCCESS,
    })),

    on(NotesActions.getNoteFailure, (state, { errorMessage }) => ({
      ...state,
      errorMessage: errorMessage,
      status: NotesStateStatus.ERROR,
    })),
);
