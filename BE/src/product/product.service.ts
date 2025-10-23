import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import slugify from 'slugify';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

interface ProductPagination extends PaginationQuery {
  category_id?: number;
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
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (options.search)
      queryBuilder.andWhere('product.title = :title', {
        title: options.search,
      });

    if (options.category_id)
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: options.category_id,
      });

    if (options.deleted)
      queryBuilder.andWhere('product.deleted :deleted', {
        deleted: options.deleted,
      });

    queryBuilder
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.name'])
      .orderBy('product.created_at', 'DESC');

    return paginate<Product>(queryBuilder, options);
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...data,
    });

    newProduct.slug = this.generateSlug(newProduct.title);

    return await this.productRepository.save(newProduct);
  }
}
