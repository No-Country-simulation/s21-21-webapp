import { Module } from "@nestjs/common";
import { ScreeningService } from "./screening.service";
import { ScreeningController } from "./screening.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [ScreeningController],
  providers: [ScreeningService, PrismaService],
  exports: [ScreeningService]
})
export class ScreeningModule {}
