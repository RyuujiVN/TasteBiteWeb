import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'nguyenbaolong1405',
    description: 'Nhập tên tài khoản',
  })
  @Column()
  @MaxLength(50)
  user_name: string;

  @ApiProperty({
    example: 'Nguyễn Bảo Long',
    description: 'Nhập họ tên',
  })
  @Column()
  @MaxLength(255)
  full_name: string;

  @ApiProperty({
    description: 'Nhập đường dẫn ảnh avatar',
  })
  @Column({ nullable: true })
  avatar_url: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Nhập số điện thoại',
  })
  @Column({ nullable: true })
  @MaxLength(10)
  phone: string;

  @ApiProperty({
    example: 'test123@gmail.com',
    description: 'Nhập email',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Nhập mật khẩu',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'klwernihasodfpwp',
    description: 'Token để kích hoạt tài khoản',
  })
  @Column({ nullable: true, type: 'text' })
  token_active: string;

  @ApiProperty({
    example: true,
    description: 'Tài khoản đã kích hoạt hay chưa',
  })
  @Column({ default: false, type: 'bool' })
  is_active: boolean;
}
