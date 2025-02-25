import { Module } from "@nestjs/common";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { ImagesModule } from "./images/images.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { MoviesModule } from "./movies/movies.module";
import { BookingModule } from "./booking/booking.module";
import { HallModule } from './hall/hall.module';
import { ScreeningModule } from './screening/screening.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    CloudinaryModule,
    ImagesModule,
    PrismaModule,
    MoviesModule,
    BookingModule,
    AuthModule,
    HallModule,
    ScreeningModule,
    PaymentsModule,
    OrdersModule,
  ]
})
export class AppModule {}
