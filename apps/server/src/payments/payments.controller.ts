import { PaymentsService } from './payments.service';

import { PaymentSessionDto } from './dto/payment-session.dto';
import { Body, Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('stripe-create-payment-session')
  async createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return await this.paymentsService.createPaymentSession(paymentSessionDto)
  }

  @Post('stripe-webhook')
  async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
    return this.paymentsService.stripeWebhook({ signature, rawBody: req.rawBody! });
  }
}