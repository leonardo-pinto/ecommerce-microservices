import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productsService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiCreatedResponse({
    type: [Product],
  })
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }
}
