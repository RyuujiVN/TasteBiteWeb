import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty({ message: 'Tên role không được để trống!' })
  @MaxLength(50)
  @ApiProperty({
    example: 'Admin',
    description: 'Tên role',
  })
  title: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({
    example: 'Quản trị viên của trang web',
    description: 'Mô tả ngắn gọn role',
  })
  description?: string;

  @IsString()
  @ApiProperty({
    example: 'create_user, update_user',
    description: 'Các quyền hạn của role',
  })
  permissions: string;
}
