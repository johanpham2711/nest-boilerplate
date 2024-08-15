import { Injectable } from '@nestjs/common';
import { appConfig } from './configs';
import { IHealthCheck } from './interfaces';

@Injectable()
export class AppService {
  healthCheck(): IHealthCheck {
    return { version: `v${appConfig.version}` };
  }
}
