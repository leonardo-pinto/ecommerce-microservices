import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentDataDto {
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
