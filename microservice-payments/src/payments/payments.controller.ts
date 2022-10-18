import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AckErrors } from 'src/utils/ack-errors';
import { ProcessPaymentDto } from './dtos/process-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  private logger = new Logger(PaymentsController.name);

  constructor(private paymentsService: PaymentsService) {}

  @EventPattern('process-payment')
  async processPayment(
    @Payload() processPaymentDto: ProcessPaymentDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Data: ${JSON.stringify(processPaymentDto)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.paymentsService.processPayment(processPaymentDto);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error)}`);
      if (AckErrors.hasAckErrors(error.message)) {
        await channel.ack(originalMessage);
      }
    }
  }
}
