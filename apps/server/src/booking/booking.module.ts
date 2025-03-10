import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
