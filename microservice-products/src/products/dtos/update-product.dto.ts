import { IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
