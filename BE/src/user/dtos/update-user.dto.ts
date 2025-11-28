import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    example: 'User',
    description: 'Họ tên',
  })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({
    example: 'User',
    description: 'Tên tài khoản',
  })
  @IsString()
  @IsOptional()
  user_name?: string;

  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email',
  })
  @IsString()
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'string',
    description: 'Avatar',
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại',
  })
  @IsString()
  @IsOptional()
  @Length(10, 10)
  phone?: string;
}
