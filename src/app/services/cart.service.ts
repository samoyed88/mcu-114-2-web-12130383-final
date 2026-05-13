import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalCount = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));

  readonly totalAmount = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.product.discount * item.quantity, 0)
  );

  add(product: Product, quantity: number = 1): void {
    const current = this._items();
    const existingIndex = current.findIndex((item) => item.product.id === product.id);

    if (existingIndex >= 0) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      this._items.set(updated);
    } else {
      this._items.set([...current, { product, quantity }]);
    }
  }

  remove(productId: number): void {
    this._items.set(this._items().filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }

    const current = this._items();
    const updated = current.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    this._items.set(updated);
  }

  clear(): void {
    this._items.set([]);
  }
}
