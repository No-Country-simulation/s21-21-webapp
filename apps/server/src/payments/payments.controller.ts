import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe-webhook')
  async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
    return await this.paymentsService.stripeWebhook({ signature, rawBody: req.rawBody! });
  }
}
