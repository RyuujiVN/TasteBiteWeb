import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Controller('category')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAccessAuthGuard)
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách category có phân trang' })
  @ApiQuery({ name: 'page', required: true, type: Number, default: 1 })
  @ApiQuery({ name: 'limit', required: true, type: Number, default: 10 })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'Loại category (FOOD, DRINK))',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Tìm kiếm theo tên category',
  })
  findAllPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ): Promise<Pagination<Category>> {
    return this.categoryService.findAllPagination({
      page,
      limit,
      type,
      search,
    });
  }

  @Post('create')
  @ApiOperation({ summary: 'Thêm mới category' })
  @ApiBody({
    type: CreateCategoryDTO,
  })
  createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDTO);
  }

  @Put('update/:id')
  @UseGuards(JwtAccessAuthGuard)
  @ApiOperation({ summary: 'Cập nhật category' })
  @ApiBody({
    type: UpdateCategoryDTO,
  })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDTO);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xoá category' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.delete(id);

    return {
      message: 'Xoá category thành công!',
    };
  }
}
