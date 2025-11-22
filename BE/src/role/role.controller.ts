import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

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
}
