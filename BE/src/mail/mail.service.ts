/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendOtpMail(userEmail: string, otp: string) {
    const mailOptions = {
      from: this.configService.get<string>('emailUser'),
      to: userEmail,
      subject: 'Mã OTP xác thực đăng nhập',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Mã OTP của bạn</h2>
          <p>Đây là mã OTP để xác thực tài khoản của bạn:</p>

          <div style="
            display: inline-block;
            padding: 12px 20px;
            font-size: 24px;
            font-weight: bold;
            background-color: #4f46e5;
            color: #fff;
            border-radius: 8px;
            margin: 10px 0;
          ">
            ${otp}
          </div>

          <p>Mã OTP có hiệu lực trong <b>5 phút</b>. Tuyệt đối không chia sẻ cho người khác.</p>
          <hr/>
          <p style="font-size:12px; color:#888;">© 2025 TasteBite. All rights reserved.</p>
        </div>
      `,
    };

    try {
      await this.mailService.sendMail(mailOptions);
      console.log(`Email đã được gửi tới: ${userEmail}`);
    } catch (error) {
      console.log('Lỗi', error);
    }
  }
}
