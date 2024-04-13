import { INote } from "@notes/shared-lib/interfaces/note.interface";

export interface NotesState {
    status: NotesStateStatus;
    notes: INote[];
}

export enum NotesStateStatus {
    INITIAL = 'initial',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}