import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../core/types/ProductDto';
import { api } from '../../../core/api';

interface Restrict {
  name?: string;
  categoryId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProducts(
    name?: string | null,
    categoryId?: number | null
  ): Observable<any> {
    let restrict: Restrict = {};
    if (name) restrict.name = name;
    if (categoryId) restrict.categoryId = categoryId;
    return this.http.post<ProductDto[]>(`${api}/product/all/criteria`, {
      ...restrict,
    });
  }

  createProduct(item: any) {
    return this.http.put<number>(`${api}/product`, {
      ...item,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(`${api}/product/${id}`);
  }

  updateProduct(id: number, item: any) {
    return this.http.post<boolean>(`${api}/product/${id}`, {
      ...item,
    });
  }
}
