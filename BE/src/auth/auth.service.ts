/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dtos/login.dto';
import bcrypt from 'bcryptjs';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { OtpService } from 'src/otp/otp.service';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { ChangePasswordDTO } from './dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  async generateToken(
    payload: any,
    secretSignature: string,
    expire: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: secretSignature,
      expiresIn: expire,
    });
  }

  async login(
    data: LoginDTO,
  ): Promise<{ userInfo: any; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      relations: ['role', 'cart'],
    });

    if (!user) throw new ForbiddenException('Tài khoản hoặc mật khẩu sai!');

    const passwordMatched = await bcrypt.compare(data.password, user.password);

    if (!passwordMatched)
      throw new ForbiddenException('Tài khoản hoặc mật khẩu sai!');

    const payload: any = {
      id: user.id,
      email: user.email,
      user_name: user.user_name,
      avatar: user.avatar_url,
      cart_id: user.cart?.id,
    };

    if (user.role) {
      payload.role = user.role.title;
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        payload,
        this.configService.get<string>('ACCESS_TOKEN')!,
        '1h',
      ),
      this.generateToken(
        payload,
        this.configService.get<string>('REFRESH_TOKEN')!,
        '7d',
      ),
    ]);

    return {
      userInfo: {
        ...payload,
        permissions: user.role.permissions.split(', '),
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refresh(tokenDTO: RefreshTokenDTO): Promise<{ accessToken: string }> {
    try {
      const refreshTokenDecoded = await this.jwtService.verify(
        tokenDTO.refreshToken,
        {
          secret: this.configService.get<string>('REFRESH_TOKEN'),
        },
      );

      const payload = {
        id: refreshTokenDecoded.id,
        email: refreshTokenDecoded.email,
        user_name: refreshTokenDecoded.user_name,
        avatar: refreshTokenDecoded.avatar_url,
        role: refreshTokenDecoded?.role,
      };

      const accessToken = await this.generateToken(
        payload,
        this.configService.get<string>('ACCESS_TOKEN')!,
        '1h',
      );

      return {
        accessToken: accessToken,
      };
    } catch (error) {
      console.log('Refresh token failed: ', error);
      throw new UnauthorizedException('Invalid refresh token!');
    }
  }

  async sendOtpToEmail(data: ForgotPasswordDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const otp: string = this.otpService.generateOtp(6);

    await Promise.all([
      this.mailService.sendOtpMail(data.email, otp),
      this.otpService.create(data.email, otp),
    ]);
  }

  async verifyOtp(data: VerifyOtpDto) {
    const otpRecord = await this.otpService.findOneByEmail(data.email);

    if (data.otp !== otpRecord.otp)
      throw new UnprocessableEntityException('OTP không hợp lệ');
    else if (otpRecord.expiredAt < new Date())
      throw new UnprocessableEntityException('OTP đã hết hạn');
  }

  async changePassword(data: ChangePasswordDTO) {
    if (data.password !== data.confirm_password)
      throw new UnprocessableEntityException('Xác nhận mật khẩu không khớp');

    await this.verifyOtp({ email: data.email, otp: data.otp });

    const passwordEncrypt = await bcrypt.hash(data.password, 10);

    await this.userRepository.update(
      {
        email: data.email,
      },
      { password: passwordEncrypt },
    );
  }
}
