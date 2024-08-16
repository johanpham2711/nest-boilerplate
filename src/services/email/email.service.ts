// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TUser } from 'src/interfaces';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyRegisterOtp(user: TUser, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nest Boilerplate! Confirm your Email',
      template: './verify-register',
      context: {
        // filling <%= %> brackets with content
        name: user.name,
        otp,
        date: new Date().toLocaleDateString(),
      },
    });
  }
}
