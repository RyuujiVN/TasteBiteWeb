import { RevenueService } from './revenue.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/common/enums/permission.enum';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { PermissionGuard } from 'src/guards/permission.guard';

@Controller('revenue')
@UseGuards(JwtAccessAuthGuard, PermissionGuard)
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get('')
  @Permissions(Permission.VIEW_DASHBOARD)
  @ApiOperation({ summary: 'Thống kê cho dashboard' })
  @ApiQuery({ name: 'orderType', required: true, type: String })
  getRevenue(@Query('orderType') orderType: 'month' | 'year') {
    return this.revenueService.getRevenue(orderType);
  }
}
