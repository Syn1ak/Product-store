import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../../shared/table/table.component';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatDialog } from '@angular/material/dialog';
import { ProductsUpsertModalComponent } from '../upsert-modal/products-upsert-modal.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TableComponent,
    ProductsTableComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class ProductsListComponent implements OnInit {
  private toast = inject(MessageService);

  readonly dialog = inject(MatDialog);
  name = new FormControl<string>('');

  ngOnInit(): void {
    this.name.valueChanges.subscribe({
      next: (val) => console.log(val),
    });
  }

  create() {
    const dialogRef = this.dialog.open(ProductsUpsertModalComponent, {
      data: { title: 'Create product' },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (!res) return;
        console.log(res);
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product was added!',
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
