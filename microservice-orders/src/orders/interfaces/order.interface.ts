import { OrderStatusEnum } from '../enums/order-status.enum';
import { ProductData } from './product-data.interface';
import { User } from './user.interface';

export class Order {
  productsData: ProductData[];
  user: User;
  date: Date;
  totalValue: number;
  status: OrderStatusEnum;
}
