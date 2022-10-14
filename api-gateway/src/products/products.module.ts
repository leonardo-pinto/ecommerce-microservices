import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
