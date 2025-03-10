import { Body, Injectable } from '@nestjs/common';

import { MoviesService } from '../movies/movies.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentsService } from '../payments/payments.service';

import { OrderStatus } from '@prisma/client'
import { ScreeningService } from '../screening/screening.service';

interface OrderWithProducts {
  OrderItem: {
    title: any
    price: number
    productId: string
    quantity: number
    imageUrl?: string
  }[]
  id: string
  totalAmount: number
  totalItems: number
  status: OrderStatus
  paid: boolean
  paidAt: Date | null
  createdAt: Date
  updateAt: Date
  discounts: any
}
// 

@Injectable()
export class OrdersService {

  constructor(
    private readonly moviesService: MoviesService,
    private readonly screeningService: ScreeningService,
    private readonly paymentService: PaymentsService,
    private readonly prismaService: PrismaService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { items, buyerUserId } = createOrderDto;

    const movieIds = items.map(movie => movie.productId)

    const defaultQuantity = 1

    // validate ids also in the screening collection
    const screeningMovies = await this.screeningService.validateIds(movieIds)
      .catch(err => { throw err })

    //* calculate total amount
    const totalAmount = screeningMovies
      .reduce((acc, { price }) => {
        const totalPrice = price * defaultQuantity

        return acc + totalPrice
      }, 0);


    //* total quantity of items
    const totalItems = items.reduce((acc, orderItem) => {
      return acc + defaultQuantity
    }, 0)

    //* create order
    const order = await this.prismaService.order.create({
      data: {
        totalAmount,
        totalItems,
        buyerUserId,
        OrderItem: {
          createMany: {
            data: screeningMovies.map(({ price, id }) => ({
              price: price,
              productId: id,
              quantity: defaultQuantity,
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
        title: screeningMovies?.find(movie => movie.id === orderItem.productId)?.movie.title,
        imageUrl: screeningMovies?.find(movie => movie.id === orderItem.productId)?.movie?.imageUrl ?? ''
      })),
      discounts: createOrderDto.discounts
    }
  }

  async createPaymentSession(order: OrderWithProducts) {
    const ids = order?.OrderItem.map(item => item.productId)

    await this.screeningService.validateIds(ids)
      .catch(err => { throw err })

    try {
      const paymentSession = this.paymentService.createPaymentSession({
        orderId: order.id,
        currency: 'ars',
        items: order.OrderItem.map(item => ({
          imageUrl: item.imageUrl,
          name: item.title,
          price: item.price * 100,
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
