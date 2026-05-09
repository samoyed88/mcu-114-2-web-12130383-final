import { CurrencyPipe } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { OrderFormComponent } from '../../components/order-form/order-form.component';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, CartItemComponent, OrderFormComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  protected cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  orderForm = viewChild.required(OrderFormComponent);

  get canSubmit(): boolean {
    return this.orderForm().isValid && this.cartService.totalCount() > 0;
  }

  onQuantityChange(event: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemove(productId: number): void {
    this.cartService.remove(productId);
  }

  onSubmit(): void {
    if (!this.canSubmit) return;

    const order = {
      customer: this.orderForm().value,
      items: this.cartService.items(),
      totalAmount: this.cartService.totalAmount(),
    };

    this.orderService.submitOrder(order).subscribe(() => {
      alert('訂單已送出！');
      this.cartService.clear();
      this.orderForm().reset();
      this.router.navigate(['products']);
    });
  }
}
