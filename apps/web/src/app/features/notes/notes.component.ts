import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchNotesComponent } from './search-notes/search-notes.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, SearchNotesComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {}
