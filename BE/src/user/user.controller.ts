import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';

@Controller('user')
@ApiBearerAuth('JWT-auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  @UseGuards(JwtAccessAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
