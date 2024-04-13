import { Component, ElementRef, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNotesComponent } from './search-notes/search-notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { NotesState, selectGetNotes, getNotes } from '@notes/web/app/store/notes';
import * as NotesActions from '@notes/web/app/store/notes/notes.actions';
import { DeleteNoteComponent } from './delete-note/delete-note.component';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    NgbModalModule,
    SearchNotesComponent, 
    AddNoteComponent, 
    ListNotesComponent,
    DeleteNoteComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  private readonly modalService = inject(NgbModal);
  private readonly store = inject(Store<NotesState>);

  tags = [];
  selectedNote!: INote;

  notes$ = this.store.select(selectGetNotes);

  constructor() {
    this.store.dispatch(NotesActions.getNotes());
  }

  onClickAdd(template: TemplateRef<ElementRef>) {
    this.modalService.open(template, { centered: true });
  }

  openDeleteConfirmation(template: TemplateRef<ElementRef>, note: INote) {
    this.selectedNote = note;
    this.modalService.open(template, { centered: true });
  }

  handleAddNote = (note: Omit<INote, "id" | "status">) => this.store.dispatch(NotesActions.addNote({ note }));

  handleDeleteNote = (note: INote) => this.store.dispatch(NotesActions.deleteNote({ note })) 

}
