import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class UpdateProduct {
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}

export class UpdateProductDataDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateProduct)
  updateProductDto: UpdateProduct;

  @IsString()
  @IsNotEmpty()
  id: string;
}
