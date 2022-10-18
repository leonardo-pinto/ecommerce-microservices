import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
