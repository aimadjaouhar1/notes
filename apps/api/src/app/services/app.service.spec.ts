import { Test } from '@nestjs/testing';

import { NoteService } from './note.service';

describe('AppService', () => {
  let service: NoteService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [NoteService],
    }).compile();

    service = app.get<NoteService>(NoteService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
