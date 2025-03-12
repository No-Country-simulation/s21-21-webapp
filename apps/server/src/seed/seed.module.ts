import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HallModule } from 'src/hall/hall.module';
import { SeatModule } from 'src/seat/seat.module';
import { MoviesModule } from 'src/movies/movies.module';
import { ScreeningModule } from 'src/screening/screening.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PrismaModule,
    HallModule,
    SeatModule,
    MoviesModule,
    ScreeningModule,
    BookingModule
  ]
})
export class SeedModule {}
