/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { COMMON_MESSAGES } from '@common/messages';
import { IResponse } from '@common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const isServerError = status === HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse();
    const message = isServerError
      ? COMMON_MESSAGES.INTERNAL_SERVER_ERROR
      : exception.message;

    const errors =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as any).message ?? exceptionResponse);

    const responseBody: IResponse = {
      success: false,
      message,
      errors,
      code: status,
    };

    response.status(status).json(responseBody);
  }
}
