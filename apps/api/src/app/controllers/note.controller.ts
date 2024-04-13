import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { NoteService } from '../services/note.service';
import { NoteDto } from '../dto/note.dto';

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Post()
  addNote(@Body('note') note: NoteDto) {
    return this.noteService.addNote(note);
  }

  @Delete('/:id')
  deleteNote(@Param('id') noteId: number) {
    return this.noteService.deleteNote(noteId);
  }
}
