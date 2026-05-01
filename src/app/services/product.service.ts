import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _data: Product[] = [
    new Product({
      id: 1,
      name: 'A 產品',
      authors: ['作者甲', '作者乙'],
      company: '博碩文化',
      isShow: true,
      price: 1580,
      discount: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=A',
      createDate: new Date('2025-04-09'),
    }),
    new Product({
      id: 2,
      name: 'B 產品',
      authors: ['作者丙'],
      company: '天瓏資訊',
      isShow: true,
      price: 2400,
      discount: 0.8,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=B',
      createDate: new Date('2025-03-15'),
    }),
    new Product({
      id: 3,
      name: 'C 產品',
      authors: ['作者甲', '作者丁'],
      company: '歐萊禮',
      isShow: true,
      price: 1580,
      discount: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=C',
      createDate: new Date('2025-02-20'),
    }),
    new Product({
      id: 4,
      name: 'D 產品',
      authors: ['作者乙', '作者丙'],
      company: '博碩文化',
      isShow: false,
      price: 3200,
      discount: 0.75,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=D',
      createDate: new Date('2025-01-10'),
    }),
    new Product({
      id: 5,
      name: 'E 產品',
      authors: ['作者戊'],
      company: '天瓏資訊',
      isShow: true,
      price: 980,
      discount: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=E',
      createDate: new Date('2025-05-01'),
    }),
    new Product({
      id: 6,
      name: 'F 產品',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '歐萊禮',
      isShow: true,
      price: 4500,
      discount: 0.9,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=F',
      createDate: new Date('2024-12-25'),
    }),
    new Product({
      id: 7,
      name: 'G 產品',
      authors: ['作者丁'],
      company: '博碩文化',
      isShow: true,
      price: 1200,
      discount: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=G',
      createDate: new Date('2025-04-01'),
    }),
    new Product({
      id: 8,
      name: 'H 產品',
      authors: ['作者戊', '作者己'],
      company: '天瓏資訊',
      isShow: false,
      price: 2800,
      discount: 0.85,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=H',
      createDate: new Date('2025-03-05'),
    }),
    new Product({
      id: 9,
      name: 'I 產品',
      authors: ['作者甲'],
      company: '歐萊禮',
      isShow: true,
      price: 1750,
      discount: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=I',
      createDate: new Date('2025-04-20'),
    }),
    new Product({
      id: 10,
      name: 'J 產品',
      authors: ['作者乙', '作者丁'],
      company: '博碩文化',
      isShow: true,
      price: 3600,
      discount: 0.7,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=J',
      createDate: new Date('2025-01-30'),
    }),
  ];

  getList(pageIndex: number, pageSize: number, name?: string): Observable<{ data: Product[]; count: number }> {
    let filteredData = this._data.filter((p) => p.isShow);

    if (name) {
      filteredData = filteredData.filter((p) => p.name.includes(name));
    }

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return of({
      data: filteredData.slice(startIndex, endIndex),
      count: filteredData.length,
    });
  }

  getById(productId: number): Observable<Product | undefined> {
    return of(this._data.find(({ id }) => id === productId));
  }
}
