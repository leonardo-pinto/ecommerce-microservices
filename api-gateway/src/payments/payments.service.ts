import { Injectable } from '@nestjs/common';
import { ClientProxyRMQ } from 'src/proxyrmq/client-proxy-rmq';
import { ProcessPaymentDto } from './dtos/process-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private clientProxyRMQ: ClientProxyRMQ) {}

  private clientPayments = this.clientProxyRMQ.getClientProxyPaymentsInstance();

  async processPayment(
    processPaymentDto: ProcessPaymentDto,
    user: Express.User,
  ) {
    const payload = {
      ...processPaymentDto,
      user,
    };
    this.clientPayments.emit('process-payment', payload);
  }
}
