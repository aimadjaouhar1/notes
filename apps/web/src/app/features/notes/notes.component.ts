import { Component, ElementRef, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNotesComponent } from './search-notes/search-notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { NotesState, selectGetNotes, addNote } from '@notes/web/app/store/notes';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    NgbModalModule,
    SearchNotesComponent, 
    AddNoteComponent, 
    ListNotesComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  private readonly modalService = inject(NgbModal);
  private readonly store = inject(Store<NotesState>);

  addNoteModalRef?: NgbModalRef;

  tags = [];

  notes$ = this.store.select(selectGetNotes);


  onClickAdd(template: TemplateRef<ElementRef>) {
    this.addNoteModalRef = this.modalService.open(template, { centered: true });
  }

  handleAddNote(note: Omit<INote, "id" | "status">) {
    this.store.dispatch(addNote({ note }));
  }

}
