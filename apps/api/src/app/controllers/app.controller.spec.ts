import { Test, TestingModule } from '@nestjs/testing';

import { NoteController } from './note.controller';
import { NoteService } from '../services/note.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<NoteController>(NoteController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
