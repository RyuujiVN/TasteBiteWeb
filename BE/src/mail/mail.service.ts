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

  async sendVerificationMail(userEmail, token) {
    const verifyUrl = `http://localhost:3000/auth/verify?token=${token}`;
    const mailOptions = {
      from: this.configService.get<string>('emailUser'),
      to: userEmail,
      subject: 'Xác minh tài khoản đã đăng ký',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Chào mừng bạn đến với <span style="color:#4f46e5;">TasteBite</span></h2>
          <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào nút bên dưới để xác minh email của bạn:</p>
          <a href="${verifyUrl}" 
             style="display:inline-block; padding:10px 20px; background-color:#4f46e5; color:#fff; text-decoration:none; border-radius:6px;">
             Xác minh tài khoản
          </a>
          <p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này.</p>
          <hr/>
          <p style="font-size:12px; color:#888;">© 2025 Your App. All rights reserved.</p>
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
