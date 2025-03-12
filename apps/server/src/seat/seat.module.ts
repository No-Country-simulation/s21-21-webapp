import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [SeatController],
  providers: [SeatService, PrismaService],
  exports: [SeatService],
})
export class SeatModule {}
