import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-notes',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './search-notes.component.html',
  styleUrl: './search-notes.component.scss',
})
export class SearchNotesComponent {
  @Output() search = new EventEmitter<string>();

  searchQuery = '';

  onSubmit = () => this.search.emit(this.searchQuery);

}
