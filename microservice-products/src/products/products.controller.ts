import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { AckErrors } from '../utils/ack-errors';
import { UpdateProductDataDto } from './dtos/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('create-product')
  async createProduct(
    @Payload() data: CreateProductDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.productsService.createProduct(data);
      await channel.ack(originalMessage);
    } catch (error) {
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-products')
  async getAllProducts(@Ctx() context: RmqContext): Promise<Product[]> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const result = await this.productsService.getAllProducts();
      return result;
    } finally {
      await channel.ack(originalMessage);
    }
  }

  @EventPattern('update-product')
  async updateProduct(
    @Payload() data: UpdateProductDataDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const { updateProductDto, id } = data;
    try {
      await channel.ack(originalMessage);
      await this.productsService.updateProduct(updateProductDto, id);
    } catch (error) {
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }
}
