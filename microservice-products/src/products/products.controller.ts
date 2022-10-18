import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { AckErrors } from '../utils/ack-errors';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './interfaces/product.interface';

@Controller()
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('create-product')
  async createProduct(
    @Payload() data: CreateProductDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Data: ${JSON.stringify(data)}`);
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

  @MessagePattern('get-product-by-id')
  async getProductById(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<Product> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const result = await this.productsService.getProductById(id);
      await channel.ack(originalMessage);
      return result;
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error)}`);
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }

  @EventPattern('update-product-quantity')
  async updateProduct(
    @Payload() data: UpdateProductDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Data: ${JSON.stringify(data)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const { quantity, id } = data;
    try {
      await channel.ack(originalMessage);
      await this.productsService.updateProduct(quantity, id);
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error)}`);
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }
}
