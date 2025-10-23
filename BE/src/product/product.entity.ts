import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  category_id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ length: 50 })
  slug: string;

  @Column('boolean', { default: false })
  deleted: boolean;

  @Column('boolean', { default: false })
  is_featured: boolean;

  @Column('date', { default: () => 'CURRENT_DATE' })
  created_at: Date;

  @Column('date', { nullable: true, onUpdate: 'CURRENT_DATE' })
  updated_at?: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
