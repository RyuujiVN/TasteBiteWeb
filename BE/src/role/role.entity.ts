import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ nullable: true })
  permissions: string;

  @OneToOne(() => User, (user) => user.role)
  user: User;
}
