import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, ReactiveFormsModule, CartItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  protected cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.pattern(/^.+[市縣].+[區鄉鎮市].+/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^09\d{8}$/)]),
  });

  get canSubmit(): boolean {
    return this.form.valid && this.cartService.totalCount() > 0;
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
