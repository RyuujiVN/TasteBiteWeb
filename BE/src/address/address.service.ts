import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find();
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
}
