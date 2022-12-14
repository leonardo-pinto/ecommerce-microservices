import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProcessPaymentDto } from './dtos/process-payment.dto';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async processPayment(
    @Body() processPaymentDto: ProcessPaymentDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    this.paymentsService.processPayment(processPaymentDto, user);
  }
}
