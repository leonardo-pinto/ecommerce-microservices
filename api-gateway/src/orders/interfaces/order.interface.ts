import { OrderStatusEnum } from '../enums/order-status.enum';

export class Order {
  productsData: ProductData[];
  user: Express.User;
  date: Date;
  totalValue: number;
  status: OrderStatusEnum;
}

class ProductData {
  id: string;
  quantity: number;
  value: number;
}
