import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OptionList } from '../../../core/types/OptionList';
import { CategoryDto } from '../../../core/types/CategoryDto';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
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
    return new Observable<CategoryDto[]>((observer) => {
      setTimeout(() => {
        observer.next(this.CATEGORIES);
        observer.complete();
      }, 120);
    });
  }

  createCategory(item: CategoryDto) {
    return new Observable<CategoryDto>((observer) => {
      setTimeout(() => {
        observer.next(item);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: CategoryDto) => {
        console.log(res);
        this.CATEGORIES.push(res);
      })
    );
  }

  deleteCategory(id: number) {
    return new Observable<number>((observer) => {
      setTimeout(() => {
        observer.next(id);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: number) => {
        console.log(res);
        const idx = this.CATEGORIES.findIndex((item) => item.id == id);
        this.CATEGORIES.splice(idx, 1);
      })
    );
  }

  updateCategory(id: number, item: CategoryDto) {
    return new Observable<number>((observer) => {
      setTimeout(() => {
        observer.next(id);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: number) => {
        console.log(res);
        const idx = this.CATEGORIES.findIndex((item) => item.id == id);
        this.CATEGORIES[idx] = item;
      })
    );
  }

  CATEGORIES: CategoryDto[] = [
    {
      id: 1,
      name: 'Books',
      description:
        'All kinds of books including fiction, non-fiction, and academic',
    },
    {
      id: 2,
      name: 'Electronics',
      description:
        'Devices and gadgets such as smartphones, laptops, and cameras',
    },
    {
      id: 3,
      name: 'Clothing',
      description: 'Apparel for men, women, and children',
    },
    {
      id: 4,
      name: 'Furniture',
      description:
        'Home and office furniture including chairs, tables, and cabinets',
    },
    {
      id: 5,
      name: 'Groceries',
      description: 'Daily essentials and food items',
    },
    {
      id: 6,
      name: 'Toys',
      description: 'Playthings and games for children of all ages',
    },
    {
      id: 7,
      name: 'Sports Equipment',
      description:
        'Gear for various sports including football, basketball, and more',
    },
    {
      id: 8,
      name: 'Beauty Products',
      description: 'Cosmetics and skincare products',
    },
    { id: 9, name: 'Automotive', description: 'Car accessories and tools' },
    {
      id: 10,
      name: 'Music Instruments',
      description:
        'Instruments for musicians including guitars, pianos, and drums',
    },
    {
      id: 11,
      name: 'Gardening',
      description: 'Tools and supplies for gardening enthusiasts',
    },
    {
      id: 12,
      name: 'Pet Supplies',
      description: 'Food, toys, and accessories for pets',
    },
    {
      id: 13,
      name: 'Kitchen Appliances',
      description: 'Devices and utensils for the kitchen',
    },
    {
      id: 14,
      name: 'Stationery',
      description: 'Office supplies and school essentials',
    },
    {
      id: 15,
      name: 'Health & Fitness',
      description: 'Products related to health and physical fitness',
    },
  ];
}
