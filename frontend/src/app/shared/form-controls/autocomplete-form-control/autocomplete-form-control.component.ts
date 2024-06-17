import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgForOf } from '@angular/common';
import { OptionList } from '../../../core/types/OptionList';

@Component({
  selector: 'app-autocomplete-form-control',
  standalone: true,
  imports: [
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

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  filteredOptions: OptionList[] = [];

  ngOnInit(): void {
    this.filteredOptions = this.options.slice();
  }

  filter() {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(filterValue)
    );
  }
}
