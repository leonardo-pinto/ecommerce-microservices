import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ClientProxyRMQ } from 'src/proxyrmq/client-proxy-rmq';
import { ProcessPaymentDto } from './dtos/process-payment.dto';
import { PaymentStatusEnum } from './enums/payment-status.enum';
import { Payment } from './interfaces/payment.interface';
import { MailerService } from '@nestjs-modules/mailer';
import HTML_PAYMENT_NOTIFICATION from './static/html-payment-notification';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel('Payment')
    private readonly paymentModel: Model<Payment>,
    private clientProxyRMQ: ClientProxyRMQ,
    private readonly mailerService: MailerService,
  ) {}

  private readonly clientOrders =
    this.clientProxyRMQ.getClientProxyOrdersInstance();

  async processPayment(processPaymentDto: ProcessPaymentDto): Promise<void> {
    const { orderId } = processPaymentDto;
    const response = this.clientOrders.send('get-order-by-id', orderId);
    const order = await lastValueFrom(response);

    if (!order || order.status !== PaymentStatusEnum.AWAITING_PAYMENT) {
      throw new BadRequestException('Invalid order');
    }

    const payment = new this.paymentModel(processPaymentDto);
    payment.status = PaymentStatusEnum.PAID;
    payment.date = new Date();
    await payment.save();

    this.clientOrders.emit('update-order-status', {
      status: PaymentStatusEnum.PAID,
      id: payment.orderId,
    });

    this.sendPaymentNotification(payment);
  }

  private sendPaymentNotification(payment: Payment) {
    let markup: string;

    markup = HTML_PAYMENT_NOTIFICATION;
    markup = markup.replace(/#NAME/g, payment.user.name);
    markup = markup.replace(/#ORDER_ID/g, payment.orderId);

    this.mailerService.sendMail({
      to: payment.user.email,
      from: `"ECOMMERCE MICROSERVICE" <${process.env.AWS_SES_VERIFIED_EMAIL}>`,
      subject: 'Payment processed',
      html: markup,
    });
  }
}
