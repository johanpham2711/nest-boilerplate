import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PROCESSOR, QUEUE } from 'src/constants';
import { IQueueHandle } from 'src/interfaces';
import { EmailService } from '../email';

@Processor(QUEUE.EMAIL_QUEUE)
export class BullQueueProcessor {
  constructor(private readonly emailService: EmailService) {}
  @OnQueueActive()
  onActive(job: Job): void {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data: ${JSON.stringify(job.data)}...`,
    );
  }

  @Process(PROCESSOR.SEND_REGISTER_EMAIL)
  async sendRegisterEmail(job: Job<IQueueHandle>): Promise<boolean> {
    try {
      const data = job.data.data;
      await this.emailService.sendRegisterOtp(
        {
          email: data.email,
          name: data.name,
        },
        data.otp,
      );

      return true;
    } catch (e: unknown) {
      console.log('🚀 ~ BullQueueProcessor ~ sendRegisterEmail ~ e:', e);
      return false;
    }
  }

  @Process(PROCESSOR.SEND_FORGOT_PASSWORD_EMAIL)
  async sendForgotPasswordEmail(job: Job<IQueueHandle>): Promise<boolean> {
    try {
      const data = job.data.data;
      await this.emailService.sendForgotPasswordOtp(
        {
          email: data.email,
          name: data.name,
        },
        data.otp,
      );

      return true;
    } catch (e: unknown) {
      console.log('🚀 ~ BullQueueProcessor ~ sendForgotPasswordEmail ~ e:', e);
      return false;
    }
  }
}
