import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CATEGORIES } from '../../products/constants';
import { OptionList } from '../../../core/types/OptionList';
import { CategoryDto } from '../../../core/types/CategoryDto';

@Injectable()
export class CategoriesService {
  fetchCategories() {}

  fetchCategoriesOptionList(): Observable<OptionList[]> {
    return new Observable<CategoryDto[]>((observer) => {
      setTimeout(() => {
        observer.next(CATEGORIES);
        observer.complete();
      }, 120);
    }).pipe(
      map((categories: CategoryDto[]) =>
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      )
    );
  }
}
