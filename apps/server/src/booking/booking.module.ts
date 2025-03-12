import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { SeatModule } from "../seat/seat.module";

@Module({
  imports: [NotificationsModule, SeatModule],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
  exports: [BookingService]
})
export class BookingModule {}
