import { Body, Injectable, NotFoundException } from "@nestjs/common";

import { MoviesService } from "../movies/movies.service";

import { CreateOrderDto, OrderItemDto } from "./dto/create-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsService } from "../payments/payments.service";

import { OrderStatus } from "@prisma/client";
import { ScreeningService } from "../screening/screening.service";
import { PaidOrderDto } from "./dto/paid-order.dto";

interface OrderWithProducts {
  OrderItem: {
    title: any;
    price: number;
    productId: string;
    quantity: number;
    imageUrl?: string;
    seatIds?: string[]; // Añadir esta propiedad
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updateAt: Date;
  discounts: any;
}

//

@Injectable()
export class OrdersService {
  constructor(
    private readonly screeningService: ScreeningService,
    private readonly paymentService: PaymentsService,
    private readonly prismaService: PrismaService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, buyerUserId } = createOrderDto;
  
    const screeningIds = items.map((item) => item.productId);
    const allSeatIds = items.flatMap((item) => item.seatIds);
  
    // Validar ids de proyecciones
    const screeningMovies = await this.screeningService
      .validateIds(screeningIds)
      .catch((err) => {
        throw err;
      });
  
    // Validar que los asientos estén disponibles
    await this.validateSeatsAvailability(items);
  
    // Calcular total basado en precio de proyecciones y cantidad de asientos
    const totalAmount = screeningMovies.reduce((acc, screening) => {
      const orderItem = items.find((item) => item.productId === screening.id);
      if (!orderItem) {
        throw new Error(`Order item for screening ${screening.id} not found`);
      }
      const seatCount = orderItem.seatIds.length;
      const totalPrice = screening.price * seatCount;
  
      return acc + totalPrice;
    }, 0);
  
    // Total de asientos
    const totalItems = items.reduce((acc, orderItem) => {
      return acc + orderItem.seatIds.length;
    }, 0);
  
    // Crear orden con transacción para garantizar integridad
    const order = await this.prismaService.$transaction(async (prisma) => {
      // Crear la orden
      const newOrder = await prisma.order.create({
        data: {
          totalAmount,
          totalItems,
          buyerUserId,
          OrderItem: {
            createMany: {
              data: items.map(({ productId, seatIds }) => {
                const screeningMovie = screeningMovies.find(
                  (s) => s.id === productId
                );
                if (!screeningMovie) {
                  throw new Error(`Screening with ID ${productId} not found`);
                }
                return {
                  price: screeningMovie.price * seatIds.length,
                  productId,
                  quantity: seatIds.length,
                };
              }),
            },
          },
        },
        include: {
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              productId: true,
            },
          },
        },
      });
  
      // Crear reservas para cada proyección
      for (const item of items) {
        const screening = screeningMovies.find((s) => s.id === item.productId);
  
        if (!screening) {
          throw new Error(`Screening with ID ${item.productId} not found`);
        }
  
        // Crear booking para cada proyección
        const booking = await prisma.booking.create({
          data: {
            userId: buyerUserId,
            screeningId: item.productId,
            totalPrice: screening.price * item.seatIds.length,
            status: "PENDING",
          },
        });
  
        // Crear relaciones con asientos
        for (const seatId of item.seatIds) {
          await prisma.seatBooking.create({
            data: {
              bookingId: booking.id,
              seatId,
            },
          });
        }
      }
  
      return newOrder;
    });
  
    return {
      ...order,
      OrderItem: order.OrderItem.map((orderItem) => {
        const screeningMovie = screeningMovies.find(
          (movie) => movie.id === orderItem.productId
        );
        return {
          ...orderItem,
          title: screeningMovie?.movie?.title || "Unknown Title",
          imageUrl: screeningMovie?.movie?.imageUrl || "",
        };
      }),
      discounts: createOrderDto.discounts,
    };
  }

  // Nuevo método para validar disponibilidad de asientos
  private async validateSeatsAvailability(items: OrderItemDto[]) {
    for (const item of items) {
      const { productId, seatIds } = item;

      // Verificar que los asientos existen
      const seats = await this.prismaService.seat.findMany({
        where: { id: { in: seatIds } },
      });

      if (seats.length !== seatIds.length) {
        throw new Error(`Some selected seats do not exist`);
      }

      // Verificar que los asientos no están ya reservados para esta proyección
      const bookedSeats = await this.prismaService.seatBooking.findMany({
        where: {
          seatId: { in: seatIds },
          booking: {
            screeningId: productId,
            status: { notIn: ["CANCELLED"] },
          },
        },
      });

      if (bookedSeats.length > 0) {
        throw new Error(`Some seats are already booked for this screening`);
      }
    }
  }

  async createPaymentSession(order: OrderWithProducts) {
    const ids = order?.OrderItem.map((item) => item.productId);

    await this.screeningService.validateIds(ids).catch((err) => {
      throw err;
    });

    try {
      const paymentSession = this.paymentService.createPaymentSession({
        orderId: order.id,
        currency: "ars",
        items: order.OrderItem.map((item) => ({
          imageUrl: item.imageUrl,
          name: item.title,
          price: item.price * 100,
          quantity: item.quantity,
        })),
        discounts: order.discounts,
      });

      return paymentSession;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        OrderItem: true
      }
    });

    if (!order) throw new NotFoundException(`Order with id ${id} not found`)

    return order
  }
}
