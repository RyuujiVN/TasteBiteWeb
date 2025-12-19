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
  @ApiQuery({ name: 'date_start', required: false, type: Date })
  @ApiQuery({ name: 'date_end', required: false, type: Date })
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('status') status?: OrderStatusEnum,
    @Query('date_start') date_start?: Date,
    @Query('date_end') date_end?: Date,
  ): Promise<Pagination<Order>> {
    return this.orderService.findAll({
      page,
      limit,
      search,
      status,
      date_start,
      date_end,
    });
  }

  @Patch('update/status/:id')
  @ApiOperation({ summary: 'Cập nhật trạng thái đơn hàng' })
  @ApiBody({
    type: UpdateStatusOrderDTO,
  })
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateStatusOrderDTO,
  ) {
    await this.orderService.updateStatus(id, data.status);

    return {
      message: 'Cập nhật trạng thái thành công',
    };
  }
}
