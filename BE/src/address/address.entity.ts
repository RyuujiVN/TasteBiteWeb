import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'boolean', default: false })
  is_default: boolean;
}
