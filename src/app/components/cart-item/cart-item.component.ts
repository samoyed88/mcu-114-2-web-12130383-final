import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  host: { class: 'app-cart-item' },
})
export class CartItemComponent {
  item = input.required<CartItem>();
  quantityChange = output<{ productId: number; quantity: number }>();
  remove = output<number>();

  subtotal = computed(() => {
    const { product, quantity } = this.item();
    return product.price * product.discount * quantity;
  });

  onQuantityChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.quantityChange.emit({ productId: this.item().product.id, quantity: value });
  }
}
