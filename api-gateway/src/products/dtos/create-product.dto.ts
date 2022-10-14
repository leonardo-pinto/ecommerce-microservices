import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
      name: string;

  @IsNumber()
  @IsNotEmpty()
      price: number;

  @IsNumber()
  @IsNotEmpty()
      quantity: number;

  @IsString()
  @IsNotEmpty()
      description: string;
}
