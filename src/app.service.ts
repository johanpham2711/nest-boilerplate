import { IHealthCheck } from '@common/interfaces';
import { appConfig } from './configs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): IHealthCheck {
    return { version: `v${appConfig.version}` };
  }
}
