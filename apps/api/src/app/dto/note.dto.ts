import { INote } from "@notes/shared-lib/interfaces";
import {IsArray, IsNotEmpty, IsString } from "class-validator";


export class NoteDto implements Omit<INote, 'id' | 'status'> {
    
    @IsString() @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    tags: string[];    
}