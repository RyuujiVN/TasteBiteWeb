import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên người dùng không được để trống!' })
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message:
      'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số!',
  })
  password: string;
}
