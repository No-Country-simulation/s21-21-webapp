import { Body, Injectable } from '@nestjs/common';

import { MoviesService } from '../movies/movies.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentsService } from '../payments/payments.service';


// 
import { OrderStatus } from '@prisma/client'

interface OrderWithProducts {
  OrderItem: {
    title: any;
    price: number;
    productId: string;
    quantity: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updateAt: Date;
  discounts: any
}
// 

@Injectable()
export class OrdersService {

  constructor(
    private readonly moviesService: MoviesService,
    private readonly paymentService: PaymentsService,
    private readonly prismaService: PrismaService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { items, buyerUserId } = createOrderDto;

    const movieIds = items.map(movie => movie.productId)
    const movies = await this.moviesService.validateIds(movieIds)
      .catch(err => { throw err })

    const defaultPrice = 3000

    //* calculate total amount
    const totalAmount = movies
      .reduce((acc, { id }) => {
        // const itemQuantity = items.find(item => item.productId === id).quantity
        const itemQuantity = items.find(item => item?.productId === id)?.quantity ?? 1
        const totalPrice = defaultPrice * itemQuantity
        return acc + totalPrice
      }, 0);

    //* total quantity of items
    const totalItems = items.reduce((acc, orderItem) => {
      return acc + orderItem.quantity
    }, 0)

    //* create order
    const order = await this.prismaService.order.create({
      data: {
        totalAmount,
        totalItems,
        buyerUserId,
        OrderItem: {
          createMany: {
            data: items.map(orderItem => ({
              // price: movies.find(movie => movie.id === orderItem.productId)?.price,
              price: defaultPrice,
              quantity: orderItem.quantity,
              productId: orderItem.productId
            }))
          }
        },
      },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true
          }
        }
      }
    })

    return {
      ...order,
      OrderItem: order.OrderItem.map(orderItem => ({
        ...orderItem,
        title: movies.find(movie => movie.id === orderItem.productId)?.title
      })),
      discounts: createOrderDto.discounts
    }
  }

  async createPaymentSession(order: OrderWithProducts) {
    try {
      const paymentSession = this.paymentService.createPaymentSession({
        orderId: order.id,
        currency: 'clp',
        items: order.OrderItem.map(item => ({
          name: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        discounts: order.discounts
      })

      return paymentSession

    } catch (error) {
      throw error
    }
  }
}
