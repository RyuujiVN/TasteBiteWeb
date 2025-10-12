import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Product } from './product.entity';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới sản phẩm' })
  @ApiBody({
    type: CreateProductDTO,
  })
  createProduct(@Body() data: CreateProductDTO): Promise<Product> {
    return this.productService.create(data);
  }
}
