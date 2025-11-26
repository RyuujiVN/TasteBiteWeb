import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDTO } from './dtos/update-role.dto';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UpdatePermissionRoleDTO } from './dtos/update-permission-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findAllPagination(options: PaginationQuery): Promise<Pagination<Role>> {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.title', 'role.description']);

    if (options.search)
      queryBuilder.andWhere('role.title ILIKE :title', {
        title: `%${options.search}%`,
      });

    return paginate<Role>(queryBuilder, options);
  }

  async findOne(id: number | undefined): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: id },
      select: { id: true, title: true },
    });

    if (!role) throw new NotFoundException('Không tìm thấy role');
    return role;
  }

  async create(data: CreateRoleDTO): Promise<Role> {
    const role = new Role();

    role.title = data.title;
    role.description = data.description;

    return await this.roleRepository.save(role);
  }

  async update(id: number, data: UpdateRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: id } });

    if (!role) throw new NotFoundException('Không tìm thấy role!');

    Object.assign(role, data);
    return await this.roleRepository.save(role);
  }

  async updatePermission(data: UpdatePermissionRoleDTO) {
    await Promise.all(
      data.roles.map(async (item) =>
        this.roleRepository.update(
          { id: item.id },
          {
            permissions: item.permissions.join(', '),
          },
        ),
      ),
    );

    console.dir(data, { depth: null });
    return data;
  }

  async delete(id: number) {
    const result = await this.roleRepository.delete({ id: id });

    if (result.affected === 0)
      throw new NotFoundException('Không tìm thấy role!');
  }
}
