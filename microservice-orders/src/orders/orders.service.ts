import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ClientProxyRMQ } from '../proxyrmq/client-proxy-rmq';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { OrderStatusEnum } from './enums/order-status.enum';
import { Order, OrderDocument } from './schemas/order.schema';
import { ProductsData } from './schemas/products-data.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<OrderDocument>,
    private clientProxyRMQ: ClientProxyRMQ,
  ) {}

  private readonly clientProducts =
    this.clientProxyRMQ.getClientProxyProductsInstance();

  async createOrder(createOrderDto: CreateOrderDto) {
    for (const productData of createOrderDto.productsData) {
      const response = this.clientProducts.send(
        'get-product-by-id',
        productData.id,
      );
      const currProduct: ProductsData = await lastValueFrom(response);
      const currIndex = createOrderDto.productsData.indexOf(productData);
      createOrderDto.productsData[currIndex].price = currProduct.price;
    }

    const order = new this.orderModel(createOrderDto);
    order.date = new Date();
    order.status = OrderStatusEnum.AWAITING_PAYMENT;
    order.totalPrice = order.productsData.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);

    await order.save();
    for (const productData of order.productsData) {
      const { id, quantity } = productData;
      this.clientProducts.emit('update-product-quantity', {
        quantity,
        id,
      });
    }
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById({ _id: id });
    if (!order) {
      throw new RpcException('Order not found');
    }
    return order;
  }

  async updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const { id, status } = updateOrderStatusDto;
    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
    );

    if (!updatedOrder) {
      throw new RpcException('Invalid product id');
    }
  }
}
