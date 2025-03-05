import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { NotificationsService } from "src/notifications/notifications.service";

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationsService
  ) {}

  async create(data: CreateBookingDto) {
    const booking = await this.prisma.booking.create({ data });

    // Enviar notificación de confirmación
    await this.notificationService.sendNotification(
      data.userId,
      `Tu reserva para la función ${data.screeningId} está confirmada.`,
      'BOOKING_CONFIRMATION',
    );
    

    return booking;
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateBookingDto) {
    return this.prisma.booking.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
