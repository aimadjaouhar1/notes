import { Component, ElementRef, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNotesComponent } from './search-notes/search-notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { NotesState } from '@notes/web/app/store/notes/notes.reducer';
import { addNote } from '@notes/web/app/store/notes/notes.actions';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, TranslateModule, SearchNotesComponent, AddNoteComponent, NgbModalModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  private readonly modalService = inject(NgbModal);
  private readonly store = inject(Store<NotesState>);

  addNoteModalRef?: NgbModalRef;

  tags = [];

  onClickAdd(template: TemplateRef<ElementRef>) {
    this.addNoteModalRef = this.modalService.open(template, { centered: true });
  }

  handleAddNote(note: Omit<INote, "id" | "status">) {
    this.store.dispatch(addNote({ note }));
  }

}
