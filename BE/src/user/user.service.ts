import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import bcrypt from 'node_modules/bcryptjs';
import { PaginationQuery } from 'src/common/interfaces/pagination.interface';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly roleService: RoleService,
  ) {}

  async register(userDTO: CreateUserDTO): Promise<void> {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existedUser = await this.userRepository.findOne({
      where: { email: userDTO.email },
    });

    if (existedUser) throw new ConflictException('Email đã tồn tại!');

    // Lưu vào database
    const user = new User();
    user.email = userDTO.email;
    user.full_name = userDTO.full_name;
    user.password = userDTO.password;
    user.user_name = userDTO.email.split('@')[0];

    user.password = await bcrypt.hash(user.password, 10);
    user.token_active = uuidv4();

    await this.userRepository.save(user);
    await this.mailService.sendVerificationMail(user.email, user.token_active);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        is_active: false,
      },
    });
  }

  async findAllAdminPagination(
    options: PaginationQuery,
  ): Promise<Pagination<User>> {
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
}
