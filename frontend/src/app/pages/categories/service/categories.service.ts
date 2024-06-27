import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OptionList } from '../../../core/types/OptionList';
import { CategoryDto } from '../../../core/types/CategoryDto';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../core/api';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  fetchCategoriesOptionList(): Observable<OptionList[]> {
    return this.fetchCategories().pipe(
      map((categories: CategoryDto[]) =>
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      )
    );
  }

  fetchCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${api}/category/all`);
  }

  createCategory(item: CategoryDto) {
    return this.http.put<number>(`${api}/category`, {
      ...item,
    });
  }

  deleteCategory(id: number) {
    return this.http.delete<boolean>(`${api}/category/${id}`);
  }

  updateCategory(id: number, item: CategoryDto) {
    return this.http.post<boolean>(`${api}/category/${id}`, {
      ...item,
    });
  }
}
