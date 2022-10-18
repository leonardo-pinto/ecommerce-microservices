import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from './payments/payments.module';
import { ProxyRMQModule } from './proxyrmq/proxy-rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.v0chnrz.mongodb.net/payments?retryWrites=true&w=majority`,
    ),
    ProxyRMQModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
