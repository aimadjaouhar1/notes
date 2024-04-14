import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-placeholder',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './empty-placeholder.component.html',
  styleUrl: './empty-placeholder.component.scss',
})
export class EmptyPlaceholderComponent {
  @Output() reload = new EventEmitter<void>();
}
