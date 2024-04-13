import { Module } from '@nestjs/common';

import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';

@Module({
  imports: [],
  controllers: [NoteController],
  providers: [NoteService],
})
export class AppModule {}
