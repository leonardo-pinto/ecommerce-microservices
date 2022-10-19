import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
