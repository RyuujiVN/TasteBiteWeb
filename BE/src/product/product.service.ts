import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true });
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...data,
    });

    newProduct.slug = this.generateSlug(newProduct.title);

    return this.productRepository.save(newProduct);
  }
}
