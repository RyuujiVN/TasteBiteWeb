import { PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from 'src/product/dtos/create-product.dto';

export class UpdateCategoryDTO extends PartialType(CreateProductDTO) {}
