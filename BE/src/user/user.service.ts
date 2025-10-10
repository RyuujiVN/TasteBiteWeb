import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'node_modules/bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
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
}
