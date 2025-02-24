import { Body, Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {

  async create(createOrderDto: CreateOrderDto) {
    const { items, buyerUserId } = createOrderDto;

    try {
      //* Validate products (movies) with service
    } catch (error) {
      throw error
    }

    // //* calculate total amount
    // const totalAmount = products
    //   .reduce((acc, { id, price }) => {
    //     const itemQuantity = items.find(item => item.productId === id).quantity
    //     const totalPrice = price * itemQuantity
    //     return acc + totalPrice
    //   }, 0);

    // //* total quantity of items
    // const totalItems = items.reduce((acc, orderItem) => {
    //   return acc + orderItem.quantity
    // }, 0)

    // //* create order
    // const order = await this.order.create({
    //   data: {
    //     totalAmount,
    //     totalItems,
    //     buyerUserId,
    //     OrderItem: {
    //       createMany: {
    //         data: items.map(orderItem => ({
    //           price: products.find(product => product.id === orderItem.productId).price,
    //           quantity: orderItem.quantity,
    //           productId: orderItem.productId,
    //           type: orderItem.type
    //         }))
    //       }
    //     },
    //   },
    //   include: {
    //     OrderItem: {
    //       select: {
    //         price: true,
    //         quantity: true,
    //         productId: true,
    //         type: true
    //       }
    //     }
    //   }
    // })

    return { msg: 'Order created' }
  }
}
