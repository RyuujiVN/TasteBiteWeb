import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { OrderStatusEnum } from 'src/common/enums/order.enum';
import { Order } from './order.entity';
import { UpdateStatusOrderDTO } from './dtos/update-status-order.dto';
import { UpdatePaymentStatusDTO } from './dtos/update-payment-status.dto';
import { PaymentStatusEnum } from 'src/common/enums/payment.enum';
import { ppid } from 'process';

@Controller('order')
@UseGuards(JwtAccessAuthGuard, PermissionGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Permissions(Permission.VIEW_ORDER)
  @ApiOperation({ summary: 'Danh sách đơn đặt hàng cho admin' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 20 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo tên khách hàng hoặc mã đơn hàng',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Lọc theo trạng thái đơn hàng',
  })
  @ApiQuery({
    name: 'payment_status',
    required: false,
    type: String,
    description: 'Lọc theo trạng thái thanh toán',
  })
  @ApiQuery({ name: 'date_start', required: false, type: Date })
  @ApiQuery({ name: 'date_end', required: false, type: Date })
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('status') status?: OrderStatusEnum,
    @Query('payment_status') payment_status?: PaymentStatusEnum,
    @Query('date_start') date_start?: Date,
    @Query('date_end') date_end?: Date,
  ): Promise<Pagination<Order>> {
    return this.orderService.findAllAdmin({
      page,
      limit,
      search,
      status,
      payment_status,
      date_start,
      date_end,
    });
  }

  @Get('my-order')
  @Permissions(Permission.VIEW_ORDER)
  @ApiOperation({ summary: 'Danh sách đơn đặt hàng cho client' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 20 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo mã đơn hàng',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Lọc theo trạng thái đơn hàng',
  })
  findAllClient(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Req() req: any,
    @Query('search') search?: string,
    @Query('status') status?: OrderStatusEnum,
  ): Promise<Pagination<Order>> {
    return this.orderService.findAllClient({
      page,
      limit,
      search,
      status,
      user_id: req?.user?.id,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết đơn hàng' })
  getDetail(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOneByid(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới đơn hàng' })
  @ApiBody({
    type: CreateOrderDTO,
  })
  async create(@Req() req: any, @Body() data: CreateOrderDTO) {
    const paymentLink = await this.orderService.create(
      req?.user?.id,
      req?.user?.cart_id,
      data,
    );

    if (!paymentLink)
      return {
        payment_url: 'http://localhost:5173/order/success',
      };
    return {
      payment_url: paymentLink,
    };
  }

  @Patch('update/status/:id')
  @Permissions(Permission.UPDATE_ORDER)
  @ApiOperation({ summary: 'Cập nhật trạng thái đơn hàng' })
  @ApiBody({
    type: UpdateStatusOrderDTO,
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateStatusOrderDTO,
  ) {
    await this.orderService.updateStatus(id, data.status);

    return {
      message: 'Cập nhật trạng thái thành công',
    };
  }

  @Patch('update/payment-status/:id')
  @ApiOperation({ summary: 'Cập nhật trạng thái đơn hàng' })
  @ApiBody({
    type: UpdatePaymentStatusDTO,
  })
  async updatePaymentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePaymentStatusDTO,
  ) {
    await this.orderService.updatePaymentStatus(id, data.payment_status);

    return {
      message: 'Cập nhật trạng thái thành công',
    };
  }
}
