import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập email!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu!' })
  password: string;
}
