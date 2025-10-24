import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import slugify from 'slugify';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateCategoryDTO } from 'src/category/dtos/update-category.dto';

interface ProductPagination extends PaginationQuery {
  category_id?: string;
  deleted?: boolean;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true });
  }

  async findAllPagination(
    options: ProductPagination,
  ): Promise<Pagination<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.title'])
      .orderBy('product.created_at', 'DESC');

    if (options.search)
      queryBuilder.andWhere('product.title = :title', {
        title: options.search,
      });

    if (options.category_id)
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: Number(options.category_id),
      });

    if (options.deleted)
      queryBuilder.andWhere('product.deleted = :deleted', {
        deleted: options.deleted,
      });

    return paginate<Product>(queryBuilder, options);
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...data,
    });

    newProduct.slug = this.generateSlug(newProduct.title);

    return await this.productRepository.save(newProduct);
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm!');

    Object.assign(product, data);
    product.updated_at = new Date();

    return this.productRepository.save(product);
  }

  async delete(id: number) {
    const result = await this.productRepository.delete({
      id: id,
    });

    if (result.affected === 0)
      throw new NotFoundException('Không tìm thấy sản phẩm!');
  }
}
