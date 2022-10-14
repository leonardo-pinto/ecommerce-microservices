import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.productsService.updateProduct(updateProductDto, id);
  }
}
