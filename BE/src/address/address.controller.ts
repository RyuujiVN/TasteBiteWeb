import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới địa chỉ' })
  @ApiBody({
    type: CreateAddressDTO,
  })
  createAddress(@Body() data: CreateAddressDTO): Promise<Address> {
    return this.addressService.create(data);
  }
}
