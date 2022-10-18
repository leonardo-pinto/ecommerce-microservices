import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class PaymentData {
  @IsNotEmpty()
  @IsString()
  creditCardNumber: string;

  @IsNotEmpty()
  @IsString()
  creditCardName: string;

  @IsNotEmpty()
  @IsString()
  creditCardCvv: string;
}

class ShippingData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;
}

export class ProcessPaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentData)
  paymentData: PaymentData;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ShippingData)
  shippingData: ShippingData;
}
