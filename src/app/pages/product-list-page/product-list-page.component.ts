import { Component, effect, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCardComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {
  private productService = inject(ProductService);

  products: Product[] = [];
  totalCount = 0;
  pageIndex = signal(1);
  pageSize = signal(5);
  searchName = signal('');

  constructor() {
    effect(() => {
      this.productService.getList(this.pageIndex(), this.pageSize(), this.searchName()).subscribe(({ data, count }) => {
        this.products = data;
        this.totalCount = count;
      });
    });
  }

  onSearch(name: string): void {
    this.searchName.set(name);
    this.pageIndex.set(1);
  }
}
