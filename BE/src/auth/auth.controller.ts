import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký user mới' })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công!',
  })
  @ApiBody({
    type: CreateUserDTO,
    examples: {
      user_1: {
        value: {
          full_name: 'User',
          email: 'user123@gmail.com',
          password: 'User123',
        },
      },
    },
  })
  async register(@Body() createUserDTO: CreateUserDTO) {
    await this.userService.register(createUserDTO);

    return {
      message: 'Đăng ký thành công!',
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({
    type: LoginDTO,
    examples: {
      user_1: {
        value: {
          email: 'user123@gmail.com',
          password: 'User123',
        },
      },
    },
  })
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Cấp lại access token' })
  @ApiBody({
    type: RefreshTokenDTO,
  })
  refresh(@Body() tokenDTO: RefreshTokenDTO): Promise<{ accessToken: string }> {
    return this.authService.refresh(tokenDTO);
  }
}
