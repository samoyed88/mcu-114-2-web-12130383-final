import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/orders';

  submitOrder(order: { customer: any; items: CartItem[]; totalAmount: number }): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }
}
