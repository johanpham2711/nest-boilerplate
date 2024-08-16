import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHelper {
  static BadRequestException(msg: string | string[]): void {
    throw new HttpException(msg, HttpStatus.BAD_REQUEST);
  }
  static UnauthorizedException(msg: string): void {
    throw new HttpException(msg, HttpStatus.UNAUTHORIZED);
  }
  static NotFoundException(msg: string): void {
    throw new HttpException(msg, HttpStatus.NOT_FOUND);
  }
  static ForbiddenException(msg: string): void {
    throw new HttpException(msg, HttpStatus.FORBIDDEN);
  }
  static InternalServerErrorException(msg: string): void {
    throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
