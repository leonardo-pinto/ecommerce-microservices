import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyRMQModule } from 'src/proxyrmq/proxy-rmq.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentSchema } from './schemas/payment.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        secure: false,
        tls: { ciphers: 'SSLv3' },
        auth: {
          user: process.env.AWS_SMTP_USER,
          pass: process.env.AWS_SMTP_PASSWORD,
        },
      },
    }),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    ProxyRMQModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
