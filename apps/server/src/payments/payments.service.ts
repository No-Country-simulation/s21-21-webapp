import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { PaymentSessionDto } from './dto/payment-session.dto';
import { envs } from './config/envs';

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

  constructor() { }

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

    const endpointSecret = envs.STRIPE_ENPOINT_SECRET!

    let event: Stripe.Event;

    console.log('Hello')

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      throw error
    }

    return event

    // switch (event.type) {
    //   case 'charge.succeeded':
    //     const chargeSucceeded = event.data.object;

    //     const payload = {
    //       stripeChargeId: chargeSucceeded.id,
    //       orderId: chargeSucceeded.metadata.orderId,
    //       receiptUrl: chargeSucceeded.receipt_url
    //     }

    //   // return await firstValueFrom(this.orderClient.send('paid-order', payload))
    //   default:
    //     console.log(`Event ${event.type} not handled`);
    // }

    // return {
    //   message: 'success',
    //   signature
    // }
  }
}
