import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  full_name: string;

  @Column({ length: 10 })
  phone: string;

  @Column()
  province: number;

  @Column()
  ward: number;

  @Column()
  street: string;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @ManyToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
