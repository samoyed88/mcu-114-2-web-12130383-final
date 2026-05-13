import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  host: { class: 'app-product-card' },
})
export class ProductCardComponent {
  id = input.required<number>();
  name = input<string>('');
  authors = input<string[]>([]);
  company = input<string>('');
  price = input<number>(0);
  discount = input<number>(1);
  imgUrl = input<string>('');
  createDate = input<string>('');

  view = output<number>();
  addToCart = output<number>();
}
