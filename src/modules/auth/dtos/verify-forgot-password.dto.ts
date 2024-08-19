import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators';
import { COMMON_MESSAGES } from 'src/messages';

export class VerifyForgotPasswordDto {
  @ApiProperty({
    description: 'Hash from forgot password',
    name: 'hash',
    type: String,
    required: true,
    example:
      'eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwib3RwIjoiMTIzNDU2Nzg5MCIsInBhc3N3b3JkIjoiUGFzc3dvcmRAMTIzIiwibmFtZSI6IkpvaG4gRG9lIn0=',
  })
  @IsString()
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('hash') })
  hash: string;

  @ApiProperty({
    description: 'Your OTP',
    name: 'otp',
    type: String,
    required: true,
    example: '123456',
  })
  @IsString()
  @Length(6, 6, { message: COMMON_MESSAGES.LENGTH('otp', 6) })
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('otp') })
  otp: string;

  @ApiProperty({
    description: 'Your new password',
    name: 'newPassword',
    type: String,
    required: true,
    example: 'Password@123',
  })
  @MaxLength(32, {
    message: COMMON_MESSAGES.MAX_LENGTH('new password', 32),
  })
  @MinLength(8, { message: COMMON_MESSAGES.MIN_LENGTH('new password', 8) })
  @IsString()
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('new password') })
  newPassword: string;

  @ApiProperty({
    description: 'Your confirm new password',
    name: 'confirmNewPassword',
    type: String,
    required: true,
    example: 'Password@123',
  })
  @Match('newPassword', { message: COMMON_MESSAGES.INVALID_CONFIRM_PASSWORD })
  @MaxLength(32, {
    message: COMMON_MESSAGES.MAX_LENGTH('confirm new password', 32),
  })
  @MinLength(8, {
    message: COMMON_MESSAGES.MIN_LENGTH('confirm new password', 8),
  })
  @IsString()
  @IsNotEmpty({
    message: COMMON_MESSAGES.FIELD_REQUIRED('confirm new password'),
  })
  confirmNewPassword: string;
}
