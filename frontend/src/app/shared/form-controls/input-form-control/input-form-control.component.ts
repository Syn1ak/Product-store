import { NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-form-control',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input-form-control.component.html',
  styleUrl: './input-form-control.component.scss',
})
export class InputFormControlComponent {
  @Input()
  title!: string;
  @Input()
  control!: FormControl;

  errorMessage = signal<string>('');

  updateErrorMessage() {
    if (this.control.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.control.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
