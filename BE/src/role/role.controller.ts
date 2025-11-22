import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { UpdateRoleDTO } from './dtos/update-role.dto';

@Controller('role')
// @UseGuards(JwtAccessAuthGuard)
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới role' })
  @ApiBody({
    type: CreateRoleDTO,
  })
  createRole(@Body() data: CreateRoleDTO): Promise<Role> {
    return this.roleService.create(data);
  }

  @Put('update/:id')
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
}
