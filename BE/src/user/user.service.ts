import { CartService } from './../cart/cart.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/user.entity';
import { Not, Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { PaginationUser } from './interfaces/pagination-user.interface';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateUserStatusDTO } from './dtos/update-user-status.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cartService: CartService,
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

    const newUser = await this.userRepository.save(user);

    await this.cartService.create(newUser.id);
  }

  async findAllPagination(options: PaginationUser): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role_id IS NULL')
      .orderBy('user.id', 'DESC');

    if (options.search)
      queryBuilder.andWhere('user.email ILIKE :email', {
        email: `%${options.search}%`,
      });

    if (options.status)
      queryBuilder.andWhere('user.status = :status', {
        status: options.status,
      });

    return paginate<User>(queryBuilder, options);
  }

  async getProfile(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new UnauthorizedException(user);

    return user;
  }

  async getCart(user_id: number) {
    const cart = await this.cartService.findOne(user_id);

    if (!cart) throw new UnauthorizedException();

    return {
      id: cart.id,
      cart_item: cart.cart_item,
    };
  }

  async updateStatus(id: number, data: UpdateUserStatusDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async updateProfile(id: number, data: UpdateUserDTO): Promise<User> {
    const [user, existedEmail] = await Promise.all([
      this.userRepository.findOne({ where: { id: id } }),
      this.userRepository.findOne({
        where: {
          email: data.email,
          id: Not(id),
        },
      }),
    ]);

    if (!user) throw new UnauthorizedException();

    if (existedEmail) throw new ConflictException('Email đã được sử dụng');

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const result = await this.userRepository.delete({ id: id });

    if (result.affected === 0)
      throw new NotFoundException('Không tìm thấy user!');
  }
}
