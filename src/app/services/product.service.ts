import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/products';

  getList(pageIndex: number, pageSize: number, name?: string): Observable<{ data: Product[]; count: number }> {
    let params = new HttpParams()
      .set('_page', pageIndex)
      .set('_limit', pageSize)
      .set('isShow', true);

    if (name) {
      params = params.set('name_like', name);
    }

    return this.http.get<Product[]>(this.baseUrl, { params, observe: 'response' }).pipe(
      map((response) => ({
        data: response.body ?? [],
        count: +(response.headers.get('X-Total-Count') ?? '0'),
      }))
    );
  }

  getById(productId: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }
}
