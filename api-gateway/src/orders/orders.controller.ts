import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './interfaces/order.interface';

@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    await this.ordersService.createOrder(createOrderDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiCreatedResponse({
    type: Order,
  })
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.getOrderById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/status')
  async updateOrderStatus(
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Param('id') id: string,
  ) {
    await this.ordersService.updateOrderStatus(updateOrderStatusDto, id);
  }
}
