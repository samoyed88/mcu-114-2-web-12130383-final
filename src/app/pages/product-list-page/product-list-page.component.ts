import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCardComponent, PaginationComponent, SearchBarComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  products = signal<Product[]>([]);
  totalCount = signal(0);
  pageIndex = signal(1);
  pageSize = signal(5);
  searchName = signal('');

  constructor() {
    effect((onCleanup) => {
      const sub = this.productService
        .getList(this.pageIndex(), this.pageSize(), this.searchName())
        .subscribe(({ data, count }) => {
          this.products.set(data);
          this.totalCount.set(count);
        });
      onCleanup(() => sub.unsubscribe());
    });
  }

  onSearch(name: string): void {
    this.searchName.set(name);
    this.pageIndex.set(1);
  }

  onView(productId: number): void {
    this.router.navigate(['products', productId]);
  }

  onAddToCart(productId: number): void {
    const product = this.products().find(({ id }) => id === productId);
    if (product) {
      this.cartService.add(product);
    }
  }
}
