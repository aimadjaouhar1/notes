import { IsString } from "class-validator";

export class NoteSearchQueryDto { 
    @IsString() 
    search: string;
}