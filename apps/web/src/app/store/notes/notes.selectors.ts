import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { NotesState } from "./notes.state";

export const selectNotes = (state: AppState) => state.notes;

export const selectGetNotes = createSelector(
    selectNotes,
    (state: NotesState) => state.notes
)

export const statusSelector = createSelector(
    selectNotes,
    (state: NotesState) => state.status
)

export const errorMessageSelector = createSelector(
    selectNotes,
    (state: NotesState) => state.errorMessage
)