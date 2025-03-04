import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MoviesModule } from '../movies/movies.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MoviesModule,
    PrismaModule,
    PaymentsModule
  ]
})
export class OrdersModule {}
