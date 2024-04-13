import { NoteStatus } from "@notes/shared-lib/enums";
import { INote } from "@notes/shared-lib/interfaces";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note implements INote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'simple-array'})
    tags: string[];

    @Column({type: 'enum', enum: NoteStatus, default: NoteStatus.CREATED})
    status: NoteStatus;

}