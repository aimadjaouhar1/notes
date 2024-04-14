import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { NoteService } from '../services/note.service';
import { NoteDto } from '../dto/note.dto';
import { NoteSearchQueryDto } from '../dto/note-search-query.dto';

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes(@Query() noteSearchDto: NoteSearchQueryDto) {
    return this.noteService.getNotes(noteSearchDto.search);
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
