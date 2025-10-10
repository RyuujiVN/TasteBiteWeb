import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dtos/login.dto';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    payload: object,
    secretSignature: string,
    expire: number,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: secretSignature,
      expiresIn: expire,
    });
  }

  async login(
    data: LoginDTO,
  ): Promise<{ userInfo: object; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Tài khoản hoặc mật khẩu sai!');

    const passwordMatched = await bcrypt.compare(data.password, user.password);

    if (!passwordMatched)
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu sai!');

    const payload = {
      id: user.id,
      email: user.email,
      user_name: user.user_name,
      avatar: user.avatar_url,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        payload,
        this.configService.get<string>('ACCESS_TOKEN')!,
        1 * 60 * 60,
      ),
      this.generateToken(
        payload,
        this.configService.get<string>('REFRESH_TOKEN')!,
        7 * 24 * 60 * 60,
      ),
    ]);

    return {
      userInfo: payload,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
