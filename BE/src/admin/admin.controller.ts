import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/user.entity';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { AdminService } from './admin.service';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';

@Controller('admin')
@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
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
    type: UpdateAdminDTO,
  })
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAdminDTO,
  ): Promise<User> {
    return this.adminService.updateAdmin(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xoá admin' })
  @ApiBody({
    type: CreateAdminDTO,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.adminService.delete(id);

    return {
      message: 'Xoá thành công!',
    };
  }
}
