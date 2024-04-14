import { createReducer, on } from "@ngrx/store";
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

    // Get Notes
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

    on(NotesActions.getNotesFailure, (state, { errorMessage }) => ({
      ...state,
      errorMessage: errorMessage,
      status: NotesStateStatus.ERROR,
    })),
    
    // Add Notes
    on(NotesActions.addNote, (state, { note }) => ({
      ...state,
      notes: [{...note, id: -1, status: NoteStatus.CREATED, }, ...state.notes ]
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

    // Delete Notes
    on(NotesActions.deleteNote, (state, { note }) => ({
      ...state,
      notes: state.notes.filter(existingNote => existingNote.id !== note.id)
    })),

    // Search Notes
    on(NotesActions.searchNote, (state, { searchQuery }) => ({
      ...state,
      status: NotesStateStatus.LOADING
    })),

    on(NotesActions.searchNoteSuccess, (state, { notes }) => ({
      ...state,
      notes: [...notes],
      status: NotesStateStatus.SUCCESS
    })),

    on(NotesActions.searchNoteFailure, (state, { errorMessage }) => ({
      ...state,
      errorMessage: errorMessage,
      status: NotesStateStatus.ERROR,
    })),
);
