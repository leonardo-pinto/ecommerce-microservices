import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: string,
  ): Promise<void> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: id },
      { $set: updateProductDto },
    );

    if (!updatedProduct) {
      throw new BadRequestException('Invalid product id');
    }
  }
}