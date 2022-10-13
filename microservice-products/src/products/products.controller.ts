import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<void> {
    await this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    const result = await this.productsService.getAllProducts();
    return result;
  }

  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.productsService.updateProduct(updateProductDto, id);
  }
}
