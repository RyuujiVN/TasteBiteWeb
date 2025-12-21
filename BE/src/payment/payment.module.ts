import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PayOSProvider } from './payos.provider';

@Module({
  providers: [PaymentService, PayOSProvider],
  controllers: [PaymentController],
  exports: [PaymentService, PayOSProvider],
})
export class PaymentModule {}
