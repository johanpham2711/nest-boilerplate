/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from 'src/interfaces';
import { COMMON_MESSAGES } from 'src/messages';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === 500) {
      response.status(status).json({
        success: false,
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
        errors: exception?.message ?? COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
        code: response.statusCode,
      } as IResponse);
    } else {
      const exceptionResponse = exception.getResponse() as any;
      response.status(status).json({
        success: false,
        message: exception.message,
        errors: exceptionResponse.message ?? exceptionResponse,
        code: response.statusCode,
      } as IResponse);
    }
  }
}
