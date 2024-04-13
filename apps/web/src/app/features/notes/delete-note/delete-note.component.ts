import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-note',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './delete-note.component.html',
  styleUrl: './delete-note.component.scss',
})
export class DeleteNoteComponent {
  @Input({required: true}) note!: INote;
  @Input({required: true}) modalRef!: NgbModalRef;
  @Output() confirm = new EventEmitter<INote>();
}
