import { Cart } from './../cart/cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { Address } from 'src/address/address.entity';
import { Order } from 'src/order/order.entity';
import { Role } from 'src/role/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    description: 'Trạng thái hoạt động',
  })
  @Column({ default: true })
  status: boolean;

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

  @Column({ name: 'role_id', nullable: true })
  role_id?: number;

  @ManyToOne(() => Role, (role) => role.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
