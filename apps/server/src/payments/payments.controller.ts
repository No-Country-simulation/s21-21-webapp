import { PaymentsService } from './payments.service';

import { PaymentSessionDto } from './dto/payment-session.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('stripe-create-payment-session')
  async createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return await this.paymentsService.createPaymentSession(paymentSessionDto)
  }
}