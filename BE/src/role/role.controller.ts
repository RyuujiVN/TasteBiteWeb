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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { UpdateRoleDTO } from './dtos/update-role.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdatePermissionRoleDTO } from './dtos/update-permission-role.dto';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionGuard } from 'src/guards/permission.guard';

@Controller('role')
@UseGuards(JwtAccessAuthGuard, PermissionGuard)
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('get-all')
  @Permissions(Permission.VIEW_ROLE)
  @ApiOperation({ summary: 'Lấy tất cả role' })
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get('')
  @Permissions(Permission.VIEW_ROLE)
  @ApiOperation({ summary: 'Lấy danh sách role có phân trang' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo tên role',
  })
  findAllRolePagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ): Promise<Pagination<Role>> {
    return this.roleService.findAllPagination({
      page,
      limit,
      search,
    });
  }

  @Post('create')
  @Permissions(Permission.ADD_ROLE)
  @ApiOperation({ summary: 'Tạo mới role' })
  @ApiBody({
    type: CreateRoleDTO,
  })
  createRole(@Body() data: CreateRoleDTO): Promise<Role> {
    return this.roleService.create(data);
  }

  @Put('update-role')
  @Permissions(Permission.UPDATE_PERMISSION_ROLE)
  @ApiOperation({ summary: 'Cập nhật permission cho role' })
  @ApiBody({
    type: UpdatePermissionRoleDTO,
  })
  updatePermission(@Body() data: UpdatePermissionRoleDTO) {
    return this.roleService.updatePermission(data);
  }

  @Put('update/:id')
  @Permissions(Permission.UPDATE_ROLE)
  @ApiOperation({ summary: 'Cập nhật role' })
  @ApiBody({
    type: UpdateRoleDTO,
  })
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDTO,
  ): Promise<Role> {
    return this.roleService.update(id, data);
  }

  @Delete('delete/:id')
  @Permissions(Permission.DELETE_ROLE)
  @ApiOperation({ summary: 'Xoá role' })
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this.roleService.delete(id);

    return {
      message: 'Xoá thành công!',
    };
  }
}
