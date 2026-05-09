import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  protected cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^09\d{8}$/)]),
  });

  get canSubmit(): boolean {
    return this.form.valid && this.cartService.totalCount() > 0;
  }

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

  onSubmit(): void {
    if (!this.canSubmit) return;

    const order = {
      customer: this.form.value,
      items: this.cartService.items(),
      totalAmount: this.cartService.totalAmount(),
    };

    this.orderService.submitOrder(order).subscribe(() => {
      alert('訂單已送出！');
      this.cartService.clear();
      this.form.reset();
      this.router.navigate(['products']);
    });
  }
}
