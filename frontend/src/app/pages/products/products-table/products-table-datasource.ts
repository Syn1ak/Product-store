import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { ProductDto } from '../../../core/types/ProductDto';

export class ProductsTableDataSource extends DataSource<ProductDto> {
  products: ProductDto[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    products?: ProductDto[],
    paginator?: MatPaginator,
    sort?: MatSort
  ) {
    super();
    if (products && paginator && sort) {
      this.products = products;
      this.paginator = paginator;
      this.sort = sort;
    }
  }

  connect(): Observable<ProductDto[]> {
    if (this.paginator && this.sort) {
      return merge(
        this.products,
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

  disconnect(): void {}

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
        case 'manufacturer':
          return compare(a.manufacturer, b.manufacturer, isAsc);
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

  hasData(): boolean {
    return this.products.length != 0;
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
