import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [OrderModule, UserModule],
  providers: [RevenueService],
  controllers: [RevenueController],
})
export class RevenueModule {}
