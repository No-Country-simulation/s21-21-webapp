import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationsService
  ) {}

  async create(data: CreateBookingDto) {
    // Verificar que todos los asientos existen y están disponibles
    const { seatIds, ...bookingData } = data;

    // Verificar que los asientos están disponibles para esa proyección
    const bookedSeats = await this.prisma.seatBooking.findMany({
      where: {
        seatId: { in: seatIds },
        booking: {
          screeningId: data.screeningId,
          status: { notIn: ["CANCELLED"] },
        },
      },
    });

    if (bookedSeats.length > 0) {
      throw new Error(`Some seats are already booked for this screening`);
    }

    // Crear la reserva con transacción para garantizar la integridad
    const result = await this.prisma.$transaction(async (prisma) => {
      // Crear la reserva
      const booking = await prisma.booking.create({
        data: {
          userId: data.userId,
          screeningId: data.screeningId,
          totalPrice: data.totalPrice,
        },
      });

      // Crear las relaciones entre reserva y asientos
      for (const seatId of seatIds) {
        await prisma.seatBooking.create({
          data: {
            bookingId: booking.id,
            seatId,
          },
        });
      }

      return booking;
    });

    // Enviar notificación de confirmación
    await this.notificationService.sendNotification(
      data.userId,
      `Tu reserva para la función ${data.screeningId} está confirmada.`,
      "BOOKING_CONFIRMATION"
    );

    return result;
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        bookedSeats: {
          include: {
            seat: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        bookedSeats: {
          include: {
            seat: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateBookingDto) {
    // Implementar lógica según sea necesario para actualizar asientos
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
