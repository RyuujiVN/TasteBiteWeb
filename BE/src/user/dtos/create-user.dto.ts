import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'User',
    description: 'Họ tên',
  })
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống!' })
  full_name: string;

  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string;

  @ApiProperty({
    example: 'User123',
    description: 'Mật khẩu',
  })
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message:
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số!',
  })
  password: string;
}
