import { ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
      stopAtFirstError: true,
    });
  }
}
