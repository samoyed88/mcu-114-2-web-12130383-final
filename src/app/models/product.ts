export class Product {
  constructor(initData?: Partial<Product>) {
    if (!initData) return;
    Object.assign(this, initData);
  }

  id!: number;
  name!: string;
  authors!: string[];
  company!: string;
  isShow!: boolean;
  price!: number;
  discount!: number;
  imgUrl!: string;
  createDate!: Date;
}
