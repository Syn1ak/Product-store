import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../../shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatDialog } from '@angular/material/dialog';
import { ProductsUpsertModalComponent } from '../upsert-modal/products-upsert-modal.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProductDto } from '../../../core/types/ProductDto';
import { ProductsTableDataSource } from './products-table-datasource';
import { ProductsService } from '../service/products.service';
import { DeleteModalComponent } from '../../../shared/modals/delete-modal/delete-modal.component';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import ToastService from '../../../core/services/ToastService';

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
  ],
})
export class ProductsListComponent implements AfterViewInit {
  private productsService = inject(ProductsService);
  private toast = inject(ToastService);
  readonly dialog = inject(MatDialog);

  name = new FormControl<string>('');
  city = new FormControl<string>('');

  displayedColumns = [
    'name',
    'manufacturer',
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

    this.city.valueChanges.subscribe({
      next: (res) => console.log(res),
    });
  }

  create() {
    const dialogRef = this.dialog.open(ProductsUpsertModalComponent, {
      data: { title: 'Create product' },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.productsService.createProduct(res),
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
            this.productsService.deleteProduct(item.name),
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
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.productsService.updateProduct(item.name, res),
            'Product was updated!'
          )
          .subscribe({
            next: () => this.dataSource.loadProducts(),
          });
      },
    });
  }

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
}
