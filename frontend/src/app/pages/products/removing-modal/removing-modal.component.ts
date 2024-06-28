import { Component, OnInit, inject } from '@angular/core';
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
  selector: 'app-removing-modal',
  standalone: true,
  imports: [
    InputFormControlComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './removing-modal.component.html',
  styleUrl: './removing-modal.component.scss',
})
export class RemovingModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RemovingModalComponent>);
  data = inject<ProductModalDto>(MAT_DIALOG_DATA);

  amount = new FormControl<number>(0, Validators.min(0));

  ngOnInit(): void {
    if (!this.data.product) return;
    const { quantity } =
      this.data.product;
    this.amount.addValidators(Validators.max(quantity));
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.amount.invalid) return this.amount.markAllAsTouched();
    this.dialogRef.close(this.amount.value);
  }
}
