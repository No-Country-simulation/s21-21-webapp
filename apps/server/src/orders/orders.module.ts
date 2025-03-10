import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MoviesModule } from '../movies/movies.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsModule } from '../payments/payments.module';
import { ScreeningModule } from 'src/screening/screening.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MoviesModule,
    ScreeningModule,
    PrismaModule,
    PaymentsModule
  ],
})
export class OrdersModule {}
