import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Cart } from './cart.entity';

@Unique(['cart_id', 'product_id'])
@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_id' })
  cart_id: number;

  @ManyToOne(() => Cart, (cart) => cart.cart_item, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ name: 'product_id' })
  product_id: number;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
