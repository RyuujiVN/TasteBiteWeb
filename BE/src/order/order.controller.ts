import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';

@Controller('order')
@UseGuards(JwtAccessAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới đơn hàng' })
  @ApiBody({
    type: CreateOrderDTO,
  })
  create(@Req() req: any, @Body() data: CreateOrderDTO) {
    return this.orderService.create(req?.user?.id, req?.user?.cart_id, data);
  }
}
