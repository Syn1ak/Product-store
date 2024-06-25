import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import { CategoryDto } from '../../../core/types/CategoryDto';
import { CategoriesService } from '../service/categories.service';

export class CategoriesTableDataSource extends DataSource<CategoryDto> {
  private categoriesSubject = new BehaviorSubject<CategoryDto[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private totalCategoriesSubject = new BehaviorSubject<number>(0);

  public loading$ = this.isLoadingSubject.asObservable();
  public length$ = this.totalCategoriesSubject.asObservable();

  categories: CategoryDto[] = [];

  constructor(
    private categoriesService: CategoriesService,
    public paginator: MatPaginator,
    public sort: MatSort
  ) {
    super();
  }

  connect(): Observable<CategoryDto[]> {
    if (this.paginator && this.sort) {
      return merge(
        this.categoriesSubject.asObservable(),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.categories]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  disconnect(): void {
    this.categoriesSubject.complete();
    this.isLoadingSubject.complete();
    this.totalCategoriesSubject.complete();
  }

  loadCategories() {
    this.isLoadingSubject.next(true);
    this.categoriesService
      .fetchCategories()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe({
        next: (products: CategoryDto[]) => {
          this.categories = products;
          this.categoriesSubject.next(this.categories);
          this.totalCategoriesSubject.next(this.categories.length);
        },
      });
  }

  private getPagedData(data: CategoryDto[]): CategoryDto[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: CategoryDto[]): CategoryDto[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
