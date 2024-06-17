import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HeroComponent,
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/routes').then((r) => r.ROUTES),
  },
];
