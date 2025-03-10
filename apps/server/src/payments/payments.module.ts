import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    ConfigModule.forRoot(),
    PrismaModule
  ],
  exports: [
    PaymentsService
  ]
})
export class PaymentsModule {}
