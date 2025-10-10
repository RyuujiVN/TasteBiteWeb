import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(JwtAccessAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
