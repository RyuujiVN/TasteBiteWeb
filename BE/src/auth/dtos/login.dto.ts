import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập email!' })
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu!' })
  password: string;
}
