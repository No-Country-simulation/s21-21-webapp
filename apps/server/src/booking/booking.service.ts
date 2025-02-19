import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateBookingDto) {
    return this.prisma.booking.create({ data });
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
