import { OrderStatusEnum } from 'src/common/enums/order.enum';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from 'src/common/enums/payment.enum';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { DeliveryEnum } from 'src/common/enums/delivery.enum';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: OrderStatusEnum.IN_PROGRESS })
  status: OrderStatusEnum;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ default: false })
  deleted: boolean;

  @Column()
  payment_method: PaymentMethodEnum;

  @Column({ default: PaymentStatusEnum.UNPAID })
  payment_status: PaymentStatusEnum;

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  shipping_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  total_cost: number;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column('date', { default: () => 'CURRENT_DATE' })
  created_at: Date;

  @Column('date', { nullable: true, onUpdate: 'CURRENT_DATE' })
  updated_at: Date;

  @Column({ type: 'jsonb' })
  delivery: {
    date: Date;
    delivery_time_range: string | null;
    delivery_time_type: DeliveryEnum;
  };

  @Column({ unique: true })
  order_code: string;

  @Column({ type: 'jsonb' })
  shipping_address: {
    street: string;
    ward: string;
    province: string;
  };

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
