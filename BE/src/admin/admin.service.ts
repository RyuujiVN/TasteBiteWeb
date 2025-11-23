import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import bcrypt from 'node_modules/bcryptjs';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findAllPagination(options: PaginationQuery): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.role', 'role')
      .addSelect(['role.id', 'role.title']);

    if (options.search)
      queryBuilder.andWhere('user.email ILIKE :email', {
        email: `%${options.search}%`,
      });

    return paginate<User>(queryBuilder, options);
  }

  async create(data: CreateAdminDTO): Promise<User> {
    const existedAdmin = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existedAdmin) throw new ConflictException('Email đã tồn tại!');

    const role = await this.roleService.findOne(data.role_id);

    const admin = new User();
    admin.email = data.email;
    admin.full_name = data.full_name;
    admin.password = data.password;
    admin.user_name = data.email.split('@')[0];
    admin.role_id = data.role_id;
    admin.password = await bcrypt.hash(admin.password, 10);
    admin.role = role;

    return await this.userRepository.save(admin);
  }

  async updateAdmin(id: number, data: UpdateAdminDTO): Promise<User> {
    const admin = await this.userRepository.findOne({ where: { id: id } });

    if (!admin) throw new NotFoundException('Không tìm thấy admin!');

    Object.assign(admin, data);

    const role = await this.roleService.findOne(data.role_id);
    admin.role = role;

    return await this.userRepository.save(admin);
  }
  async delete(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Không tìm thấy người dùng!');
  }
}
