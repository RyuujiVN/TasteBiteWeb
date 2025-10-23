import { Pagination } from 'nestjs-typeorm-paginate';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload ảnh sản phẩm' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<{ file: string }> {
    const fileUrl = await this.cloudinaryService.uploadFile(file);
    return { file: fileUrl.url };
  }

  @Get('')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm có phân trang' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo tên sản phẩm',
  })
  @ApiQuery({
    name: 'category_id',
    required: false,
    type: String,
    description: 'Lọc theo category',
  })
  @ApiQuery({
    name: 'deleted',
    required: false,
    type: String,
    description: 'Lọc theo xoá tạm thời',
  })
  findAllPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search') search?: string,
    @Query('category_id', ParseIntPipe) category_id?: number,
    @Query('deleted') deleted?: boolean,
  ): Promise<Pagination<Product>> {
    return this.productService.findAllPagination({
      page,
      limit,
      search,
      category_id,
      deleted,
    });
  }

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới sản phẩm' })
  @ApiBody({
    type: CreateProductDTO,
  })
  createProduct(@Body() data: CreateProductDTO): Promise<Product> {
    return this.productService.create(data);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiBody({
    type: UpdateProductDTO,
  })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDTO,
  ): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xoá sản phẩm' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.delete(id);

    return {
      message: 'Xoá sản phẩm thành công!',
    };
  }
}
