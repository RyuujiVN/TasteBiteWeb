import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';

// Custome file validate
export class FileValidationPipe implements PipeTransform {
  private readonly allowedExtensions = ['.png', '.jpeg', '.jpg'];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('Không có file nào được upload!');
    // originalname: 'nam-dui-ga-chay-toi.jpeg',
    const fileName = extname(value.originalname);

    if (!this.allowedExtensions.includes(fileName))
      throw new BadRequestException(
        'Định dạng file không hợp lệ (Chỉ chấp nhận .jpg, .png, .jpeg',
      );

    const maxSize = 2 * 1024 * 1024; // Max size

    if (value.size > maxSize)
      throw new BadRequestException(
        'File vượt quá dung lượng tối đa cho phép (tối đa 2MB)',
      );

    return value;
  }
}
