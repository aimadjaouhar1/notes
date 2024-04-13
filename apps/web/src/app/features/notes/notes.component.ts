import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNotesComponent } from './search-notes/search-notes.component';
import { AddNoteComponent } from './add-note/add-note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, SearchNotesComponent, AddNoteComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {}
