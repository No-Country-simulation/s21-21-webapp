import { Body, Controller, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create-order')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    // const paymentSession = await this.ordersService.createPaymentSession(order)

    // return {
    //   order,
    //   paymentSession
    // }
  }
}
