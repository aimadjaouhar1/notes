import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { INote } from '@notes/shared-lib/interfaces/note.interface';


@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  @Input({required: true}) tags!: string[];
  @Output() add = new EventEmitter<Omit<INote, 'id' | 'status'>>();

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: [''],
    description: [''],
    tags: [[]]
  });

  get controls() {
    return this.form?.controls;
  }

  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;
    
    if(this.form.valid) {
      const {title, tags, description} = this.form.getRawValue();

      if(title) {
        this.add.emit({title: title, tags: tags ?? [], description: description || ''});
      }
    }
  }

}
