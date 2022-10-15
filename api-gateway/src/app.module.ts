import { Module } from '@nestjs/common';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AwsModule } from './aws/aws.module';
import { AuthModule } from './auth/auth.module';
import { AwsCognitoService } from './aws/aws-cognito.service';

@Module({
  imports: [
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    AwsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AwsCognitoService],
})
export class AppModule {}
