import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  id: string;
}
