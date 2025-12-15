import { PartialType } from '@nestjs/swagger';
import { CreateCartItemDTO } from './create-cart-item.dto';

export class UpdateCartItemDTO extends PartialType(CreateCartItemDTO) {}
