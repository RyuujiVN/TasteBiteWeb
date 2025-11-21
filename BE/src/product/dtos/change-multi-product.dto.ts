import { IsArray, IsEnum, IsNumber } from 'class-validator';
import { ProductChangeMultiEnum } from 'src/common/enums/product.enum';

export class ChangeMultiProductDTO {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @IsEnum(ProductChangeMultiEnum, { message: 'type không hợp lệ!' })
  type: ProductChangeMultiEnum;
}
