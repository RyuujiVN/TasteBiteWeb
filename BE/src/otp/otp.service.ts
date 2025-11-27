import { Injectable } from '@nestjs/common';
import { OTP } from './otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTP)
    private readonly otpRepository: Repository<OTP>,
  ) {}

  generateOtp = (length): string => {
    let otp = 0;

    for (let i = 1; i <= length; i++) {
      const number = Math.floor(Math.random() * 10);
      otp = otp * 10 + number;
    }

    return otp.toString();
  };

  async create(email: string, otp: string) {
    const expire = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn trong 5 phút
    const otpRecord = new OTP();
    otpRecord.email = email;
    otpRecord.otp = otp;
    otpRecord.expiredAt = expire;

    await this.otpRepository.save(otpRecord);
  }
}
