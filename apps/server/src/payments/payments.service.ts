import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { PaymentSessionDto } from './dto/payment-session.dto';
import { envs } from './config/envs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaidOrderDto } from 'src/orders/dto/paid-order.dto';

interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images?: string[]
    };
    unit_amount: number;
  };
  quantity: number;
}

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(envs.STRIPE_SECRET_KEY!)

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId, discounts } = paymentSessionDto;

    try {
      const lineItems: LineItem[] = items.map((item) => {
        const line: LineItem = {
          price_data: {
            currency,
            product_data: {
              name: item.name,
            },
            // unit_amount: item.price * 100,
            unit_amount: item.price
          },
          quantity: item.quantity,
        }

        if (item.imageUrl && item.imageUrl.trim().length > 0) {
          line.price_data.product_data.images = [item.imageUrl];
        }

        return line
      })

      const session = await this.stripe.checkout.sessions.create({
        payment_intent_data: {
          metadata: { orderId },
        },
        discounts,
        line_items: lineItems,
        mode: 'payment',
        success_url: envs.STRIPE_SUCCESS_URL,
        cancel_url: envs.STRIPE_CANCEL_URL,
      });

      return {
        cancelUrl: session.cancel_url,
        successUrl: session.success_url,
        url: session.url
      }

    } catch (error) {
      throw error
    }
  }

  async stripeWebhook({ signature, rawBody }: { signature: string, rawBody: Buffer<ArrayBufferLike> }) {

    let event: Stripe.Event;

    const endpointSecret = envs.STRIPE_ENDPOINT_SECRET!

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      throw error
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;

        const payload = {
          stripeChargeId: chargeSucceeded.id,
          orderId: chargeSucceeded.metadata.orderId,
          receiptUrl: chargeSucceeded.receipt_url!
        }

        await this.paidOrder(payload)
      default:
        console.log(`Event ${event.type} not handled`);
    }

    return {
      message: 'success',
      signature
    }
  }

  private async paidOrder({ orderId, receiptUrl, stripeChargeId }: PaidOrderDto) {

    await this.prismaService.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        paid: true,
        paidAt: new Date(),
        stripeChargeId: stripeChargeId,
        receiptUrl
      }
    })

    return { msg: 'Paid Success' }
  }
}
