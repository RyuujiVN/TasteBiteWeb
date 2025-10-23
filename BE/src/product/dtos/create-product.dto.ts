import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống!' })
  @MaxLength(50)
  @ApiProperty({
    example: 'Cơm chiên dương châu',
    description: 'Tên sản phẩm',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Đây là món cơm chiên dương châu',
    description: 'Mô tả sản phẩm',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Đường link ảnh',
  })
  image_url: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Id category không được để trống!' })
  @ApiProperty({
    description: 'Id của category',
  })
  category_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Giá không được để trống!' })
  @IsDecimal()
  @Min(0)
  @Max(1000000000)
  @ApiProperty({
    example: 0,
    description: 'Giá của sản phẩm',
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Sản phẩm này là sản phẩm hot',
  })
  is_featured: boolean;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Sản phẩm bị xoá tạm thời',
  })
  deleted: boolean;
}
