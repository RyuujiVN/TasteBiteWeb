import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { CreateCartItemDTO } from './dtos/create-cart-item.dto';
import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAccessAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create-item')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  @ApiBody({
    type: CreateCartItemDTO,
  })
  addItem(@Body() data: CreateCartItemDTO): Promise<CartItem> {
    return this.cartService.addCartItem(data);
  }
}
