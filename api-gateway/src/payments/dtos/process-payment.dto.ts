import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class PaymentData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardCvv: string;
}

class ShippingData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}

export class ProcessPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentData)
  paymentData: PaymentData;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ShippingData)
  shippingData: ShippingData;
}
