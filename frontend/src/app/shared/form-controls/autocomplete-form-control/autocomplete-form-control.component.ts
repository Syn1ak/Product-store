import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgForOf } from '@angular/common';
import { OptionList } from '../../../core/types/OptionList';

@Component({
  selector: 'app-autocomplete-form-control',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './autocomplete-form-control.component.html',
  styleUrl: './autocomplete-form-control.component.scss',
})
export class AutocompleteFormControlComponent implements OnInit {
  @Input() title!: string;
  @Input() control!: FormControl;
  @Input() options!: OptionList[];
  @Input() appearance: 'fill' | 'outline' = 'fill';

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  filteredOptions: OptionList[] = [];
  errorMessage = signal<string>('');
  errorFree = false;

  ngOnInit(): void {
    this.filteredOptions = this.options.slice();
    this.errorFree = !this.control.hasValidator(Validators.required);
  }

  filter() {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(filterValue)
    );
  }

  updateErrorMessage() {
    console.log(this.control.errors);
    if (this.control.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }
}
