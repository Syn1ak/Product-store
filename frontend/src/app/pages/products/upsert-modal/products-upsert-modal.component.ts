import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductDto, ProductModalDto } from '../../../core/types/ProductDto';
import { ControlsOf } from '../../../core/models/forms/form-of';
import { NgIf } from '@angular/common';
import { InputFormControlComponent } from '../../../shared/form-controls/input-form-control/input-form-control.component';
import { AutocompleteFormControlComponent } from '../../../shared/form-controls/autocomplete-form-control/autocomplete-form-control.component';
import { CategoriesService } from '../../categories/service/categories.service';
import { OptionList } from '../../../core/types/OptionList';

@Component({
  selector: 'app-products-upsert-modal',
  standalone: true,
  templateUrl: './products-upsert-modal.component.html',
  styleUrl: './products-upsert-modal.component.scss',
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    InputFormControlComponent,
    AutocompleteFormControlComponent,
  ],
  providers: [CategoriesService],
})
export class ProductsUpsertModalComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  readonly dialogRef = inject(MatDialogRef<ProductsUpsertModalComponent>);
  data = inject<ProductModalDto>(MAT_DIALOG_DATA);

  categoriesOptions: OptionList[] = [];
  title: string = '';

  productForm = new FormGroup<ControlsOf<ProductDto>>({
    name: new FormControl<string>('', Validators.required),
    manufacturer: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    category: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.categoriesService.fetchCategoriesOptionList().subscribe({
      next: (res) => (this.categoriesOptions = res),
      error: (err) => console.log(err),
    });
    this.title = this.data.title;
    if (!this.data.product) return;
    const { name, manufacturer, description, quantity, price, category } =
      this.data.product;
    this.productForm.setValue({
      name,
      manufacturer,
      description,
      quantity,
      price,
      category,
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.productForm.value);
  }
}
