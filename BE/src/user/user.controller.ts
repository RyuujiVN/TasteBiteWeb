import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateAdminDTO } from './dtos/create-admin.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  @UseGuards(JwtAccessAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

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
    return this.userService.findAllAdminPagination({
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
    return this.userService.create(data);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Thêm mới admin' })
  @ApiBody({
    type: CreateAdminDTO,
  })
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateAdminDTO,
  ): Promise<User> {
    return this.userService.updateAdmin(id, data);
  }
}
