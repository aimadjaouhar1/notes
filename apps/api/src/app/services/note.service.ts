import { Injectable } from '@nestjs/common';
import { NoteStatus } from '@notes/shared-lib/enums';
import { INote } from '@notes/shared-lib/interfaces'
import { NoteDto } from '../dto/note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(Note) private readonly repository: Repository<Note>,
  ){}

  async getNotes(searchQuery: string): Promise<INote[]> {    
    return this.repository.find({ 
      where: [
        { title: Like(`%${searchQuery}%`) },
        { description: Like(`%${searchQuery}%`) }
      ]
    });
  }

  async addNote(note: NoteDto): Promise<INote> {
    return this.repository.save(note);
  }

  async deleteNote(noteId: number): Promise<void> {
    this.repository.delete({id: noteId});
  }
}
