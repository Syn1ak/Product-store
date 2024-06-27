import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import { ProductDto } from '../../../core/types/ProductDto';
import { ProductsService } from '../service/products.service';

export class ProductsTableDataSource extends DataSource<ProductDto> {
  private productsSubject = new BehaviorSubject<ProductDto[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private totalProductsSubject = new BehaviorSubject<number>(0);

  public loading$ = this.isLoadingSubject.asObservable();
  public length$ = this.totalProductsSubject.asObservable();

  products: ProductDto[] = [];

  constructor(
    private productsService: ProductsService,
    public paginator: MatPaginator,
    public sort: MatSort,
  ) {
    super();
  }

  connect(): Observable<ProductDto[]> {
    if (this.paginator && this.sort) {
      return merge(
        this.productsSubject.asObservable(),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.products]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  disconnect(): void {
    this.productsSubject.complete();
    this.isLoadingSubject.complete();
    this.totalProductsSubject.complete();
  }

  loadProducts(name?: string | null, categoryId?: number | null) {
    this.isLoadingSubject.next(true);
    this.productsService
      .fetchProducts(name, categoryId)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe({
        next: (products: ProductDto[]) => {
          this.products = products;
          this.productsSubject.next(products);
          this.totalProductsSubject.next(products.length);
        },
      });
  }

  private getPagedData(data: ProductDto[]): ProductDto[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: ProductDto[]): ProductDto[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'producer':
          return compare(a.producer, b.producer, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
        case 'quantity':
          return compare(+a.quantity, +b.quantity, isAsc);
        case 'price':
          return compare(+a.price, +b.price, isAsc);
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
