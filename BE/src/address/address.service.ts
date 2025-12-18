import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(user_id: number) {
    const addresses = await this.addressRepository.find({
      where: { user_id: user_id },
      order: {
        id: 'ASC',
      },
    });

    const result = await Promise.all(
      addresses.map(async (item) => {
        // Lấy province
        const provinceRes = await lastValueFrom(
          this.httpService.get(
            `https://tinhthanhpho.com/api/v1/new-provinces?keyword=${item.province}`,
          ),
        );
        const province = provinceRes.data?.data[0];

        // Lấy ward
        const wardRes = await lastValueFrom(
          this.httpService.get(
            `https://tinhthanhpho.com/api/v1/new-provinces/${item.province}/wards?keyword=${item.ward}`,
          ),
        );
        const ward = wardRes.data?.data[0];

        return {
          ...item,
          province: {
            code: province.code,
            name: `${province.type} ${province.name}`,
          },
          ward: {
            code: ward.code,
            name: `${ward.type} ${ward.name}`,
          },
        };
      }),
    );

    return result;
  }

  async create(user_id: number, data: CreateAddressDTO): Promise<Address> {
    const address = new Address();
    address.full_name = data.full_name;
    address.phone = data.phone;
    address.province = data.province;
    address.ward = data.ward;
    address.street = data.street;
    address.user_id = user_id;

    return await this.addressRepository.save(address);
  }

  async changeDefault(user_id: number, address_id: number) {
    await Promise.all([
      this.addressRepository.update(
        {
          user_id: user_id,
          id: Not(address_id),
        },
        {
          is_default: false,
        },
      ),

      this.addressRepository.update(
        { id: address_id },
        {
          is_default: true,
        },
      ),
    ]);
  }

  async update(id: number, data: UpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id: id } });

    if (!address) throw new NotFoundException('Không tìm thấy địa chỉ');

    Object.assign(address, data);

    return await this.addressRepository.save(address);
  }

  async delete(id: number) {
    const result = await this.addressRepository.delete({
      id: id,
      is_default: false,
    });

    if (result.affected == 0)
      throw new NotFoundException('Không tìm thấy địa chỉ');
  }
}
