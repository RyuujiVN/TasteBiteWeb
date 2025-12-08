import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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
  getAll(@Req() req: any) {
    return this.addressService.findAll(req?.user?.id);
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

  @Patch('change-default/:id')
  @ApiOperation({ summary: 'Thay đổi địa chỉ mặc định' })
  async changeDefaultAddress(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    await this.addressService.changeDefault(req?.user?.id, id);

    return {
      message: 'Thay đổi thành công',
    };
  }
}
