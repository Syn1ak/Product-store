import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsTableDataSource } from './products-table-datasource';
import { ProductDto } from '../../../core/types/ProductDto';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DeleteModalComponent } from '../../../shared/modals/delete-modal/delete-modal.component';
import { ProductsUpsertModalComponent } from '../upsert-modal/products-upsert-modal.component';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NgIf,
    MatProgressSpinnerModule,
  ],
})
export class ProductsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductDto>;
  dataSource = new ProductsTableDataSource();

  private productsService = inject(ProductsService);
  readonly dialog = inject(MatDialog);
  private toast = inject(MessageService);

  displayedColumns = [
    'name',
    'manufacturer',
    'description',
    'category',
    'quantity',
    'price',
    'actions',
  ];

  private loadProducts() {
    this.productsService.fetchProducts().subscribe({
      next: (res) => {
        this.dataSource = new ProductsTableDataSource(
          res,
          this.paginator,
          this.sort
        );
        this.table.dataSource = this.dataSource;
      },
    });
  }

  ngAfterViewInit(): void {
    this.loadProducts();
  }

  delete(item: ProductDto) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: item.name },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (!res) return;
        this.productsService.deleteProduct(item.name).subscribe({
          next: () => {
            this.loadProducts();
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product was deleted!',
            });
          },
        });
      },
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occured!',
        }),
    });
  }

  edit(item: ProductDto) {
    const dialogRef = this.dialog.open(ProductsUpsertModalComponent, {
      data: { title: 'Edit product', product: item },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (!res) return;
        this.productsService.updateProduct(item.name, res).subscribe({
          next: () => {
            this.loadProducts();
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product was updated!',
            });
          },
        });
      },
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occured!',
        }),
    });
  }
}
