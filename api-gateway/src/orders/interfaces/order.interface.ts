import { ExpressAdapter } from '@nestjs/platform-express';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../enums/order-status.enum';

class ProductData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}

export class Order {
  @ApiProperty({ type: [ProductData] })
  productsData: ProductData[];

  @ApiProperty()
  user: Express.User;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  status: OrderStatusEnum;
}
