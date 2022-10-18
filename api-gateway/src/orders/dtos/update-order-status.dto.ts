import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
