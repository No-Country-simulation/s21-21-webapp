import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { ImagesModule } from "./images/images.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { MoviesModule } from "./movies/movies.module";
import { BookingModule } from "./booking/booking.module";

@Module({
  imports: [
    CloudinaryModule,
    ImagesModule,
    PrismaModule,
    MoviesModule,
    BookingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
