import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoryDto } from '../../../core/types/CategoryDto';
import { CategoriesTableDataSource } from './categries-table-datasource';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../service/categories.service';
import ToastService from '../../../core/services/ToastService';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesUpsertModalComponent } from '../upsert-modal/categories-upsert-modal.component';
import { DeleteModalComponent } from '../../../shared/modals/delete-modal/delete-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-categries-list',
  templateUrl: './categries-list.component.html',
  styleUrl: './categries-list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    ToastModule,
  ],
})
export class CategriesListComponent implements AfterViewInit {
  private categoriesService = inject(CategoriesService);
  private toast = inject(ToastService);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryDto>;

  displayedColumns = ['name', 'description', 'actions'];
  dataSource!: CategoriesTableDataSource;
  lengthSub: Subscription | undefined;

  ngAfterViewInit(): void {
    this.dataSource = new CategoriesTableDataSource(
      this.categoriesService,
      this.paginator,
      this.sort
    );
    this.table.dataSource = this.dataSource;
    this.lengthSub = this.dataSource.length$.subscribe({
      next: (res) => (this.paginator.length = res),
    });
    this.dataSource.loadCategories();
  }

  create() {
    const dialogRef = this.dialog.open(CategoriesUpsertModalComponent, {
      data: { title: 'Create category' },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.categoriesService.createCategory(res),
            'Category was added!'
          )
          .subscribe({
            next: () => this.dataSource.loadCategories(),
          });
      },
    });
  }

  delete(item: CategoryDto) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { title: item.name },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.categoriesService.deleteCategory(item.id!),
            'Category was deleted!'
          )
          .subscribe({
            next: () => this.dataSource.loadCategories(),
          });
      },
    });
  }

  edit(item: CategoryDto) {
    const dialogRef = this.dialog.open(CategoriesUpsertModalComponent, {
      data: { title: 'Edit category', category: item },
    });
    this.toast.decorateError(dialogRef.afterClosed()).subscribe({
      next: (res) => {
        if (!res) return;
        this.toast
          .decorateRequest(
            this.categoriesService.updateCategory(item.id!, res),
            'Product was updated!'
          )
          .subscribe({
            next: () => this.dataSource.loadCategories(),
          });
      },
    });
  }
}
