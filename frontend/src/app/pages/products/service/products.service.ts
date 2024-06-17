import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductDto } from '../../../core/types/ProductDto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  fetchProducts(): Observable<ProductDto[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.PRODUCTS);
        observer.complete();
      }, 1000);
    });
    // return this.http.get<ProductDto[]>('https://dummyjson.com/products');
  }

  createProduct(item: ProductDto) {
    return new Observable<ProductDto>((observer) => {
      setTimeout(() => {
        observer.next(item);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: ProductDto) => {
        console.log(res);
        this.PRODUCTS.push(res);
      })
    );
    // this.http.post('https://dummyjson.com/products', {}).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     PRODUCTS.push(item);
    //   },
    //   error: () => {},
    // });
  }

  deleteProduct(name: string) {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next(name);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: string) => {
        console.log(res);
        const idx = this.PRODUCTS.findIndex((item) => item.name == name);
        this.PRODUCTS.splice(idx, 1);
      })
    );
    // this.http.delete('https://dummyjson.com/products', {}).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     PRODUCTS.push(item);
    //   },
    //   error: () => {},
    // });
  }

  updateProduct(name: string, item: ProductDto) {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next(name);
        observer.complete();
      }, 200);
    }).pipe(
      map((res: string) => {
        console.log(res);
        const idx = this.PRODUCTS.findIndex((item) => item.name == name);
        this.PRODUCTS[idx] = item;
      })
    );
    // this.http.delete('https://dummyjson.com/products', {}).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     PRODUCTS.push(item);
    //   },
    //   error: () => {},
    // });
  }

  PRODUCTS: ProductDto[] = [
    {
      name: 'Laptop',
      manufacturer: 'TechCo',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
      quantity: 50,
      price: 1200,
      category: 'Electronics',
    },
    {
      name: 'Smartphone',
      manufacturer: 'PhoneMakers',
      description:
        'Latest model smartphone with 5G capability and 128GB storage.',
      quantity: 200,
      price: 999,
      category: 'Electronics',
    },
    {
      name: 'Wireless Headphones',
      manufacturer: 'SoundWave',
      description:
        'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
      quantity: 150,
      price: 199,
      category: 'Accessories',
    },
    {
      name: 'Gaming Console',
      manufacturer: 'GameZone',
      description:
        'Next-gen gaming console with 1TB storage and ray tracing support.',
      quantity: 100,
      price: 499,
      category: 'Electronics',
    },
    {
      name: 'Smartwatch',
      manufacturer: 'WristTech',
      description: 'Smartwatch with fitness tracking and heart rate monitor.',
      quantity: 300,
      price: 250,
      category: 'Wearables',
    },
    {
      name: 'Bluetooth Speaker',
      manufacturer: 'SoundBlast',
      description: 'Portable Bluetooth speaker with 20-hour battery life.',
      quantity: 200,
      price: 99,
      category: 'Accessories',
    },
    {
      name: '4K TV',
      manufacturer: 'ScreenMaster',
      description: '55-inch 4K Ultra HD TV with HDR support.',
      quantity: 80,
      price: 799,
      category: 'Electronics',
    },
    {
      name: 'Digital Camera',
      manufacturer: 'CapturePro',
      description:
        'Mirrorless digital camera with 24MP sensor and 4K video recording.',
      quantity: 60,
      price: 899,
      category: 'Electronics',
    },
    {
      name: 'External Hard Drive',
      manufacturer: 'StoragePlus',
      description: '2TB external hard drive with USB 3.0 connectivity.',
      quantity: 500,
      price: 79,
      category: 'Accessories',
    },
    {
      name: 'Wireless Mouse',
      manufacturer: 'ClickTech',
      description: 'Ergonomic wireless mouse with adjustable DPI settings.',
      quantity: 400,
      price: 29,
      category: 'Accessories',
    },
    {
      name: 'Tablet',
      manufacturer: 'TabWorld',
      description: '10-inch tablet with 64GB storage and 4GB RAM.',
      quantity: 150,
      price: 299,
      category: 'Electronics',
    },
    {
      name: 'Smart Thermostat',
      manufacturer: 'HomeControl',
      description: 'Smart thermostat with remote control via smartphone app.',
      quantity: 100,
      price: 199,
      category: 'Home',
    },
    {
      name: 'Electric Toothbrush',
      manufacturer: 'BrushTech',
      description: 'Electric toothbrush with multiple cleaning modes.',
      quantity: 200,
      price: 59,
      category: 'Health',
    },
    {
      name: 'Fitness Tracker',
      manufacturer: 'FitTrack',
      description: 'Fitness tracker with step counting and sleep monitoring.',
      quantity: 250,
      price: 99,
      category: 'Wearables',
    },
    {
      name: 'Robot Vacuum',
      manufacturer: 'CleanBot',
      description:
        'Robot vacuum cleaner with smart navigation and app control.',
      quantity: 75,
      price: 399,
      category: 'Home',
    },
    {
      name: 'Electric Kettle',
      manufacturer: 'HeatMaster',
      description: 'Electric kettle with temperature control and fast boiling.',
      quantity: 150,
      price: 49,
      category: 'Home',
    },
    {
      name: 'Air Purifier',
      manufacturer: 'PureAir',
      description: 'HEPA air purifier with multiple fan speeds and timer.',
      quantity: 120,
      price: 149,
      category: 'Home',
    },
    {
      name: 'Cordless Drill',
      manufacturer: 'ToolPro',
      description: '18V cordless drill with variable speed control.',
      quantity: 180,
      price: 89,
      category: 'Tools',
    },
    {
      name: 'Gaming Chair',
      manufacturer: 'ComfortZone',
      description:
        'Ergonomic gaming chair with lumbar support and adjustable armrests.',
      quantity: 100,
      price: 199,
      category: 'Furniture',
    },
    {
      name: 'Monitor',
      manufacturer: 'ViewMax',
      description: '27-inch 144Hz gaming monitor with 1ms response time.',
      quantity: 90,
      price: 299,
      category: 'Electronics',
    },
    {
      name: 'Blender',
      manufacturer: 'MixMaster',
      description: 'High-speed blender with multiple blending modes.',
      quantity: 150,
      price: 69,
      category: 'Home',
    },
    {
      name: 'Instant Pot',
      manufacturer: 'CookEase',
      description: '7-in-1 electric pressure cooker with multiple functions.',
      quantity: 130,
      price: 129,
      category: 'Home',
    },
    {
      name: 'Standing Desk',
      manufacturer: 'ErgoLift',
      description: 'Adjustable height standing desk with electric lift.',
      quantity: 50,
      price: 399,
      category: 'Furniture',
    },
    {
      name: 'Office Chair',
      manufacturer: 'SeatComfort',
      description:
        'Ergonomic office chair with mesh back and adjustable height.',
      quantity: 200,
      price: 149,
      category: 'Furniture',
    },
    {
      name: 'Coffee Maker',
      manufacturer: 'BrewMaster',
      description: '12-cup coffee maker with programmable timer.',
      quantity: 180,
      price: 79,
      category: 'Home',
    },
    {
      name: 'Electric Scooter',
      manufacturer: 'RideFast',
      description: 'Electric scooter with 25km range and foldable design.',
      quantity: 60,
      price: 499,
      category: 'Transport',
    },
    {
      name: 'Water Bottle',
      manufacturer: 'HydroPlus',
      description: 'Insulated stainless steel water bottle, 1L capacity.',
      quantity: 500,
      price: 29,
      category: 'Accessories',
    },
    {
      name: 'Yoga Mat',
      manufacturer: 'FlexFit',
      description: 'Non-slip yoga mat with carrying strap.',
      quantity: 300,
      price: 25,
      category: 'Fitness',
    },
    {
      name: 'LED Desk Lamp',
      manufacturer: 'BrightLight',
      description: 'Dimmable LED desk lamp with touch controls.',
      quantity: 200,
      price: 39,
      category: 'Home',
    },
    {
      name: 'Wireless Charger',
      manufacturer: 'ChargeTech',
      description: 'Fast wireless charger for smartphones and other devices.',
      quantity: 250,
      price: 49,
      category: 'Accessories',
    },
  ];
}
