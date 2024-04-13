import { NoteStatus } from "../enums";

export interface INote {
    id: number;
    title: string;
    description: string;
    tags: string[];
    status: NoteStatus;
}