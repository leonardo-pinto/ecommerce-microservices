import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async updateProduct(quantity: number, id: string): Promise<void> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: -quantity } },
    );

    if (!updatedProduct) {
      throw new RpcException('Invalid product id');
    }
  }
}
