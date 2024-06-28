import { Component, inject } from '@angular/core';
import { InputFormControlComponent } from '../../../shared/form-controls/input-form-control/input-form-control.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ProductModalDto } from '../../../core/types/ProductDto';

@Component({
  selector: 'app-addition-modal',
  standalone: true,
  templateUrl: './addition-modal.component.html',
  styleUrl: './addition-modal.component.scss',
  imports: [
    InputFormControlComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AdditionModalComponent {
  readonly dialogRef = inject(MatDialogRef<AdditionModalComponent>);

  amount = new FormControl<number>(0, [Validators.min(1), Validators.max(500)]);

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.amount.invalid) return this.amount.markAllAsTouched();
    this.dialogRef.close(this.amount.value);
  }
}
