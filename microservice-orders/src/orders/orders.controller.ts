import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AckErrors } from '../utils/ack-errors';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  private logger = new Logger(OrdersController.name);

  constructor(private ordersService: OrdersService) {}

  @EventPattern('create-order')
  async createOrder(
    @Payload() createOrderDto: CreateOrderDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Data: ${JSON.stringify(createOrderDto)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.ordersService.createOrder(createOrderDto);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error)}`);
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-order-by-id')
  async getOrderById(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const order = await this.ordersService.getOrderById(id);
      return order;
    } finally {
      await channel.ack(originalMessage);
    }
  }

  @EventPattern('update-order-status')
  async updateOrderStatus(
    @Payload() updateOrderStatusDto: UpdateOrderStatusDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Data: ${JSON.stringify(updateOrderStatusDto)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.ordersService.updateOrderStatus(updateOrderStatusDto);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error)}`);
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }
}
