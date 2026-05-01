import { Routes } from '@angular/router';

import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListPageComponent },
  { path: 'products/:id', component: ProductDetailPageComponent },
  { path: 'cart', component: CartPageComponent },
];
