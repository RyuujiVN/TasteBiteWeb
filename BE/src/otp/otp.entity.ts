import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  otp: string;

  @Column('timestamptz')
  expiredAt: Date;
}
