import { Body, Controller, Get, Post } from '@nestjs/common';

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
    return this.noteService.addNote();
  }
}
