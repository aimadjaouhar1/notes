import { Injectable } from '@nestjs/common';
import { INote } from '@notes/shared-lib/interfaces'

@Injectable()
export class NoteService {

  async getNotes(): Promise<INote[]> {
    return [];
  }

  async addNote(): Promise<INote> {
    return {} as INote;
  }
}
