import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxyRMQ } from 'src/proxyrmq/client-proxy-rmq';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(private clientProxyRMQ: ClientProxyRMQ) {}

  private clientOrders = this.clientProxyRMQ.getClientProxyOrdersInstance();

  async createOrder(createOrderDto: CreateOrderDto, user: Express.User) {
    const payload = {
      productsData: createOrderDto.productsData,
      user,
    };
    this.clientOrders.emit('create-order', payload);
  }

  async getOrderById(id: string): Promise<Order> {
    const response = this.clientOrders.send('get-order-by-id', id);
    return await lastValueFrom(response);
  }

  async updateOrderStatus(
    updateOrderStatusDto: UpdateOrderStatusDto,
    id: string,
  ) {
    this.clientOrders.emit('update-order-status', {
      ...updateOrderStatusDto,
      id,
    });
  }
}
