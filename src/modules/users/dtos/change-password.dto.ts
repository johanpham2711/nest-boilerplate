import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators';
import { PASSWORD_REGEX } from 'src/constants';
import { COMMON_MESSAGES } from 'src/messages';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Your password',
    name: 'password',
    type: String,
    required: true,
    example: 'Password@123',
  })
  @Matches(PASSWORD_REGEX, {
    message: COMMON_MESSAGES.INVALID_PASSWORD,
  })
  @MaxLength(32, { message: COMMON_MESSAGES.MAX_LENGTH('password', 32) })
  @MinLength(8, { message: COMMON_MESSAGES.MIN_LENGTH('password', 8) })
  @IsString()
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('password') })
  password: string;

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
