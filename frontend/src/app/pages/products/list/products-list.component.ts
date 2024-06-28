import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../../shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatDialog } from '@angular/material/dialog';
import { ProductsUpsertModalComponent } from '../upsert-modal/products-upsert-modal.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProductDto } from '../../../core/types/ProductDto';
import { ProductsTableDataSource } from './products-table-datasource';
import { ProductsService } from '../service/products.service';
import { DeleteModalComponent } from '../../../shared/modals/delete-modal/delete-modal.component';
import { Subscription, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import ToastService from '../../../core/services/toast.service';
import { AutocompleteFormControlComponent } from '../../../shared/form-controls/autocomplete-form-control/autocomplete-form-control.component';
import { OptionList } from '../../../core/types/OptionList';
import { CategoriesService } from '../../categories/service/categories.service';
import { AdditionModalComponent } from '../addition-modal/addition-modal.component';
import { RemovingModalComponent } from '../removing-modal/removing-modal.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TableComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    AutocompleteFormControlComponent,
  ],
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  private categoriesService = inject(CategoriesService);
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastService);
  readonly dialog = inject(MatDialog);

  searchForm = new FormGroup({
    name: new FormControl<string | null>(''),
    category: new FormControl<string | null>(null),
  });

  displayedColumns = [
    'name',
    'producer',
    'description',
    'category',
    'quantity',
    'price',
    'actions',
  ];
  dataSource!: ProductsTableDataSource;
  lengthSub: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductDto>;

  categoriesOptions: OptionList[] = [];

  ngOnInit(): void {
    this.categoriesService.fetchCategoriesOptionList().subscribe({
      next: (res) => (this.categoriesOptions = res),
      error: (err) => console.log(err),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource = new ProductsTableDataSource(
      this.productsService,
      this.paginator,
      this.sort
    );
    this.table.dataSource = this.dataSource;
    this.lengthSub = this.dataSource.length$.subscribe({
      next: (res) => (this.paginator.length = res),
    });
    this.dataSource.loadProducts();

    this.searchForm.valueChanges.subscribe({
      next: (val) => {
        const { name, category } = val;
        const categoryOption = this.categoriesOptions.find(
          (item) => item.label === category
        );
        this.dataSource.loadProducts(name, categoryOption?.value);
      },
    });
  }

  increase(item: ProductDto) {
    const dialogRef = this.dialog.open(AdditionModalComponent);
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res: number) => {
        if (!res) return;
        item.quantity += res;
        const { name, producer, category, description, price, quantity } = item;
        const categoryOption = this.categoriesOptions.find(
          (item) => item.label === category
        );
        const view = {
          name,
          producer,
          categoryId: categoryOption?.value,
          description,
          price,
          quantity,
        };
        this.toast
          .decorateRequest(
            this.productsService.updateProduct(item.id!, view),
            'Quantity was increase!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }

  decrease(item: ProductDto) {
    const dialogRef = this.dialog.open(RemovingModalComponent, {
      data: { title: '', product: item },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res: number) => {
        if (!res) return;
        item.quantity -= res;
        const { name, producer, category, description, price, quantity } = item;
        const categoryOption = this.categoriesOptions.find(
          (item) => item.label === category
        );
        const view = {
          name,
          producer,
          categoryId: categoryOption?.value,
          description,
          price,
          quantity,
        };
        this.toast
          .decorateRequest(
            this.productsService.updateProduct(item.id!, view),
            'Quantity was decrease!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }

  create() {
    const dialogRef = this.dialog.open(ProductsUpsertModalComponent, {
      data: { title: 'Create product' },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res: ProductDto) => {
        if (!res) return;
        const { name, producer, category, description, price, quantity } = res;
        const view = {
          name,
          producer,
          categoryId: category,
          description,
          price,
          quantity,
        };
        this.toast
          .decorateRequest(
            this.productsService.createProduct(view),
            'Product was added!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }

  delete(item: ProductDto) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: item.name },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.productsService.deleteProduct(item.id!),
            'Product was deleted!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }

  edit(item: ProductDto) {
    const dialogRef = this.dialog.open(ProductsUpsertModalComponent, {
      data: { title: 'Edit product', product: item },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res: ProductDto) => {
        const { name, producer, category, description, price, quantity } = res;
        const view = {
          name,
          producer,
          categoryId: category,
          description,
          price,
          quantity,
        };
        if (!res) return;
        this.toast
          .decorateRequest(
            this.productsService.updateProduct(item.id!, view),
            'Product was updated!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }
}
