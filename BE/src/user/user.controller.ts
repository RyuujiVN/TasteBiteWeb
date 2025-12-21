import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('user')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAccessAuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('get-all')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('profile')
  @ApiOperation({
    summary: 'Lấy thông tin profile của tài khoản đang đăng nhập',
  })
  getProfile(@Req() req: any): Promise<User> {
    return this.userService.getProfile(req?.user?.id);
  }

  @Get('cart')
  @ApiOperation({
    summary:
      'Lấy danh sách các sản phẩm trong giỏ hàng của người dùng hiện tại',
  })
  getCart(@Req() req: any) {
    return this.userService.getCart(req?.user?.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload avatar tài khoản',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<{ file: string }> {
    const fileUrl = await this.cloudinaryService.uploadFile(file);

    return {
      file: fileUrl.secure_url,
    };
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Cập nhật thông tin người dùng',
  })
  @ApiBody({
    type: UpdateUserDTO,
  })
  updateProfile(@Req() req: any, @Body() data: UpdateUserDTO): Promise<User> {
    return this.userService.updateProfile(req?.user?.id, data);
  }
}
