import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentsService } from './payments.service';

@Module({
  providers: [PaymentsService],
  imports: [ConfigModule.forRoot()],
  exports: [
    PaymentsService
  ]
})
export class PaymentsModule {}
