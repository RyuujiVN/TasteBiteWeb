import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryTypeEnum } from 'src/common/enums/category-type.enum';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Tên category không được để trống!' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'Mô tả không được vượt quá 255 kí tự!' })
  description?: string;

  @IsEnum(CategoryTypeEnum, { message: 'Loại category không hợp lệ!' })
  type: CategoryTypeEnum;
}
