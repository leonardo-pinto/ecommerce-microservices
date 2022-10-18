import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatusEnum } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @IsNotEmpty()
  @IsString()
  id: string;
}
