import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { JwtAccessAuthGuard } from 'src/guards/jwt-access.guard';

@Controller('address')
@ApiTags('address')
@UseGuards(JwtAccessAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('')
  @ApiOperation({ summary: 'Danh sách tất cả địa chỉ' })
  getAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới địa chỉ' })
  @ApiBody({
    type: CreateAddressDTO,
  })
  createAddress(
    @Req() req: any,
    @Body() data: CreateAddressDTO,
  ): Promise<Address> {
    return this.addressService.create(req?.user?.id, data);
  }
}
