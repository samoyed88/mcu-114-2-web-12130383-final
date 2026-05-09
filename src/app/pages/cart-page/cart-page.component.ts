import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CITY_DISTRICT_MAP } from '../../data/city-district';

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

  cities = Object.keys(CITY_DISTRICT_MAP);
  selectedCity = signal('');
  districts = computed(() => CITY_DISTRICT_MAP[this.selectedCity()] ?? []);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^09\d{8}$/)]),
  });

  onCityChange(city: string): void {
    this.selectedCity.set(city);
    this.form.get('district')?.reset('');
  }

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
