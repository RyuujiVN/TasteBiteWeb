import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  ApiQuery,
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
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/common/decorators/permission.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateUserStatusDTO } from './dtos/update-user-status.dto';

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

  @Get('')
  @Permissions(Permission.VIEW_USER)
  @ApiOperation({ summary: 'Lấy danh sách user có phân trang' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo email',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Boolean,
    description: 'Lọc theo trạng thái',
  })
  findAllRolePagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('status') status?: boolean,
  ): Promise<Pagination<User>> {
    return this.userService.findAllPagination({
      page,
      limit,
      search,
      status,
    });
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

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Cập nhật thông tin người dùng',
  })
  @ApiBody({
    type: UpdateUserDTO,
  })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserStatusDTO,
  ): Promise<User> {
    return this.userService.updateStatus(id, data);
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
