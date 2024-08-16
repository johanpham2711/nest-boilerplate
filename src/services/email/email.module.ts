// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { EmailService } from './email.service';
import { appConfig } from 'src/configs';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: appConfig.mailHost,
          secure: false,
          auth: {
            user: appConfig.smtpUsername,
            pass: appConfig.smtpPassword,
          },
        },
        defaults: {
          from: `"Nice App" <${appConfig.smtpUsername}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
