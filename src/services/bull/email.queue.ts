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

  @Process(PROCESSOR.SEND_VERIFY_REGISTER_EMAIL)
  async sendVerifyRegisterEmail(job: Job<IQueueHandle>): Promise<boolean> {
    try {
      const data = job.data.data;
      await this.emailService.sendVerifyRegisterOtp(
        {
          email: data.email,
          name: data.name,
        },
        data.otp,
      );

      return true;
    } catch (e: unknown) {
      console.log('🚀 ~ BullQueueProcessor ~ sendVerifyRegisterEmail ~ e:', e);
      return false;
    }
  }
}
