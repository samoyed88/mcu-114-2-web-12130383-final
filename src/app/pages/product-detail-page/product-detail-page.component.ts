import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail-page',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  id = input.required<number>();
  product?: Product;

  ngOnInit(): void {
    this.productService.getById(this.id()).subscribe((product) => {
      this.product = product;
    });
  }

  onAddToCart(): void {
    if (this.product) {
      this.cartService.add(this.product);
      this.router.navigate(['cart']);
    }
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
