import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  protected cartService = inject(CartService);

  getSubtotal(price: number, discount: number, quantity: number): number {
    return price * discount * quantity;
  }

  onQuantityChange(productId: number, event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.cartService.updateQuantity(productId, value);
  }

  onRemove(productId: number): void {
    this.cartService.remove(productId);
  }
}
