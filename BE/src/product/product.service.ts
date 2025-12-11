import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import slugify from 'slugify';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateCategoryDTO } from 'src/category/dtos/update-category.dto';
import { ChangeMultiProductDTO } from './dtos/change-multi-product.dto';
import { ProductChangeMultiEnum } from 'src/common/enums/product.enum';
import {
  FilterProductAdmin,
  FilterProductClient,
} from './filter-product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true });
  }

  async findAllPaginationClient(
    options: FilterProductClient,
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.title', 'category.type'])
      .limit(options.limit);

    if (options.search)
      queryBuilder.andWhere('product.title ILIKE :title', {
        title: `%${options.search}%`,
      });

    if (options.category_id)
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: Number(options.category_id),
      });

    if (options.last_id)
      queryBuilder.andWhere('product.id > :id', {
        id: Number(options.last_id),
      });

    const order: any = options.order;

    if (options.sort_by && order)
      queryBuilder.orderBy('product.price', order.toUpperCase());
    else queryBuilder.orderBy('product.id', 'DESC');

    if (options.min_price)
      queryBuilder.andWhere('product.price >= :price', {
        price: Number(options.min_price),
      });

    if (options.max_price)
      queryBuilder.andWhere('product.price <= :price', {
        price: Number(options.max_price),
      });

    return await queryBuilder.getMany();
  }

  async findAllPagination(
    options: FilterProductAdmin,
  ): Promise<Pagination<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.title', 'category.type']);

    if (options.search)
      queryBuilder.andWhere('product.title ILIKE :title', {
        title: `%${options.search}%`,
      });

    if (options.category_id)
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: Number(options.category_id),
      });

    if (options.deleted)
      queryBuilder.andWhere('product.deleted = :deleted', {
        deleted: options.deleted,
      });

    const order: any = options.order;

    if (options.sort_by && order)
      queryBuilder.orderBy(`product.${options.sort_by}`, order.toUpperCase());
    else queryBuilder.orderBy('product.id', 'DESC');

    return paginate<Product>(queryBuilder, options);
  }

  async getDetail(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });

    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm!');

    return product;
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

  async updateMulti(data: ChangeMultiProductDTO) {
    switch (data.type) {
      case ProductChangeMultiEnum.INACTIVE:
        await this.productRepository
          .createQueryBuilder()
          .update(Product)
          .set({ deleted: true })
          .whereInIds(data.ids)
          .execute();
        break;

      case ProductChangeMultiEnum.ACTIVE:
        await this.productRepository
          .createQueryBuilder()
          .update(Product)
          .set({ deleted: false })
          .whereInIds(data.ids)
          .execute();
        break;

      case ProductChangeMultiEnum.SPECIAL:
        await this.productRepository
          .createQueryBuilder()
          .update(Product)
          .set({ is_featured: true })
          .whereInIds(data.ids)
          .execute();
        break;

      case ProductChangeMultiEnum.NOT_SPECIAL:
        await this.productRepository
          .createQueryBuilder()
          .update(Product)
          .set({ is_featured: false })
          .whereInIds(data.ids)
          .execute();
        break;

      case ProductChangeMultiEnum.DELETE:
        await this.productRepository.delete(data.ids);
        break;
    }
  }

  async delete(id: number) {
    const result = await this.productRepository.delete({
      id: id,
    });

    if (result.affected === 0)
      throw new NotFoundException('Không tìm thấy sản phẩm!');
  }
}
