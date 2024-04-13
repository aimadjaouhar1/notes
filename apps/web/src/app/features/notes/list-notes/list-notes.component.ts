import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INote } from '@notes/shared-lib/interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.scss',
})
export class ListNotesComponent {
  @Input({required: true}) notes!: INote[];
  @Output() delete = new EventEmitter<INote>();
}
