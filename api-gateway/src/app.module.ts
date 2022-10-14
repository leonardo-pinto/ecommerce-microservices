import { Module } from '@nestjs/common';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
