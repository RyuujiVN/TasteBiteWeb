import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDTO): Promise<Role> {
    const role = new Role();

    role.title = data.title;
    role.description = data.description;
    role.permissions = data.permissions;

    return await this.roleRepository.save(role);
  }
}
