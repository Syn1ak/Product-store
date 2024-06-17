import { Routes } from "@angular/router";

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./list/products-list.component').then(c => c.ProductsListComponent)
    }
]