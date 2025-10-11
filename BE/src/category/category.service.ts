/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

interface CategoryPagination extends PaginationQuery {
  type?: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAllPagination(
    options: CategoryPagination,
  ): Promise<Pagination<Category>> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (options?.type)
      queryBuilder.andWhere('category.type = :type', { type: options.type });

    if (options?.search)
      queryBuilder.andWhere('category.title ILIKE :search', {
        search: `%${options.search}%`,
      });

    return paginate<Category>(queryBuilder, options);
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.title = data.title;
    category.description = data?.description;
    category.type = data.type;

    return await this.categoryRepository.save(category);
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) throw new NotFoundException('Không tìm thấy category!');

    Object.assign(category, data);

    return await this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) throw new NotFoundException('Không tìm thấy category!');

    await this.categoryRepository.delete({ id: id });
  }
}
