import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentDataDto } from './payment-data.dto';
import { ShippingDataDto } from './shipping-data.dto';

class User {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ProcessPaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentDataDto)
  paymentData: PaymentDataDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ShippingDataDto)
  shippingData: ShippingDataDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
