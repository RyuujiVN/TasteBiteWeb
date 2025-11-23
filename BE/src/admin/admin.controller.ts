import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/user.entity';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  @ApiOperation({ summary: 'Danh sách admin trang web' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo email',
  })
  findAllPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search: string,
  ): Promise<Pagination<User>> {
    return this.adminService.findAllPagination({
      page,
      limit,
      search,
    });
  }

  @Post('create')
  @ApiOperation({ summary: 'Thêm mới admin' })
  @ApiBody({
    type: CreateAdminDTO,
  })
  createAdmin(@Body() data: CreateAdminDTO): Promise<User> {
    return this.adminService.create(data);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Cập nhật admin' })
  @ApiBody({
    type: CreateAdminDTO,
  })
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateAdminDTO,
  ): Promise<User> {
    return this.adminService.updateAdmin(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xoá admin' })
  @ApiBody({
    type: CreateAdminDTO,
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.delete(id);
  }
}
