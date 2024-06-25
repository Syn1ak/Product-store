import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./list/categries-list.component').then(
        (c) => c.CategriesListComponent
      ),
  },
];
