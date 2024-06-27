import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HeroComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/products/routes').then((r) => r.ROUTES),
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/categories/routes').then((r) => r.ROUTES),
  },
];
