import { INote } from "@notes/shared-lib/interfaces/note.interface";

export interface NotesState {
    status: NotesStateStatus;
    errorMessage: string | null;
    notes: INote[];
}

export enum NotesStateStatus {
    INITIAL = 'initial',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}