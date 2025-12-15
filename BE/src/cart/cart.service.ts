import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async create(user_id: number): Promise<Cart> {
    const cart = new Cart();
    cart.user_id = user_id;

    return await this.cartRepository.save(cart);
  }

  async findOne(user_id: number) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: user_id },
      relations: {
        cart_item: {
          product: true,
        },
      },
    });

    return cart;
  }
}
