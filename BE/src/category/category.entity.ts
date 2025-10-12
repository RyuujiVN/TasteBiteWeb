import { CategoryTypeEnum } from 'src/common/enums/category-type.enum';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  type: CategoryTypeEnum;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
