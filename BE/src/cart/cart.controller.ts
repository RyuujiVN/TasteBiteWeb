import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { CreateCartItemDTO } from './dtos/create-cart-item.dto';
import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { UpdateCartItemDTO } from './dtos/update-cart-item.dto';

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

  @Put('update/:id')
  @ApiOperation({ summary: 'Chỉnh sửa sản phẩm trong giỏ hàng' })
  @ApiBody({
    type: UpdateCartItemDTO,
  })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateCartItemDTO,
  ) {
    return this.cartService.updateCartItem(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xoá sản phẩm khỏi giỏ hàng' })
  async removeItem(@Param('id', ParseIntPipe) id: number) {
    await this.cartService.removeCartItem(id);

    return {
      message: 'Xoá thành công',
    };
  }
}
