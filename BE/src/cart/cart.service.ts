import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { EntityManager, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { CreateCartItemDTO } from './dtos/create-cart-item.dto';
import { ProductService } from 'src/product/product.service';
import { UpdateCartItemDTO } from './dtos/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productService: ProductService,
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
      order: {
        cart_item: {
          id: 'DESC',
        },
      },
    });

    return cart;
  }

  async addCartItem(data: CreateCartItemDTO): Promise<CartItem> {
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const cartItemExist = await this.cartItemRepository.findOne({
      where: {
        cart_id: data.cart_id,
        product_id: data.product_id,
      },
      relations: ['product'],
    });

    // Nếu có thì chỉ cập nhật lại quantity
    if (cartItemExist) {
      cartItemExist.quantity += data.quantity;
      return await this.cartItemRepository.save(cartItemExist);
    }

    // Nếu không thì tạo mới
    const [cartItem, product] = await Promise.all([
      this.cartItemRepository.save(data),
      this.productService.findOneById(data.product_id),
    ]);

    const newCartItem = {
      ...cartItem,
      product: product,
    };
    return newCartItem;
  }

  async updateCartItem(id: number, data: UpdateCartItemDTO) {
    return await this.cartItemRepository.update(
      { id: id },
      {
        quantity: data.quantity,
      },
    );
  }

  // Xoá một item trong cart
  async removeCartItem(id: number) {
    const result = await this.cartItemRepository.delete({
      id: id,
    });

    if (result.affected === 0) throw new NotFoundException();
  }

  // Xoá tất cả item trong cart transaction
  async deleteAllItem(manager: EntityManager, cart_id: number) {
    const result = await manager.delete(CartItem, {
      cart_id: cart_id,
    });

    if (result.affected === 0)
      throw new NotFoundException('Không có món trong giỏ hàng');
  }
}
