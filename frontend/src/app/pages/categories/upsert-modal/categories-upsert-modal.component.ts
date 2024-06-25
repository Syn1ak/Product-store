import { Component, OnInit, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CategoryDto, CategoryModalDto } from '../../../core/types/CategoryDto';
import { ControlsOf } from '../../../core/models/forms/form-of';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteFormControlComponent } from '../../../shared/form-controls/autocomplete-form-control/autocomplete-form-control.component';
import { InputFormControlComponent } from '../../../shared/form-controls/input-form-control/input-form-control.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories-upsert-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    InputFormControlComponent,
    MatButtonModule,
    AutocompleteFormControlComponent,
  ],
  templateUrl: './categories-upsert-modal.component.html',
  styleUrl: './categories-upsert-modal.component.scss',
})
export class CategoriesUpsertModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CategoriesUpsertModalComponent>);
  data = inject<CategoryModalDto>(MAT_DIALOG_DATA);

  title: string = '';

  categoryForm = new FormGroup<ControlsOf<CategoryDto>>({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.title = this.data.title;
    if (!this.data.category) return;
    const { name, description } = this.data.category;
    this.categoryForm.setValue({
      name,
      description,
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.categoryForm.invalid) return this.categoryForm.markAllAsTouched();
    this.dialogRef.close(this.categoryForm.value);
  }
}
