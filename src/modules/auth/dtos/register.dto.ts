import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators';
import { PASSWORD_REGEX } from 'src/constants';
import { COMMON_MESSAGES } from 'src/messages';

export class RegisterDto {
  @ApiProperty({
    description: 'Your email',
    name: 'email',
    type: String,
    required: true,
    example: 'example@gmail.com',
  })
  @MaxLength(255, { message: COMMON_MESSAGES.MAX_LENGTH('email', 255) })
  @IsEmail({}, { message: COMMON_MESSAGES.INVALID_EMAIL })
  @IsString()
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('email') })
  email: string;

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
    description: 'Your confirm password',
    name: 'confirmPassword',
    type: String,
    required: true,
    example: 'Password@123',
  })
  @Match('password', { message: COMMON_MESSAGES.INVALID_CONFIRM_PASSWORD })
  @MaxLength(32, {
    message: COMMON_MESSAGES.MAX_LENGTH('confirm password', 32),
  })
  @MinLength(8, { message: COMMON_MESSAGES.MIN_LENGTH('confirm password', 8) })
  @IsString()
  @IsNotEmpty({ message: COMMON_MESSAGES.FIELD_REQUIRED('confirm password') })
  confirmPassword: string;

  @ApiProperty({
    description: 'Your name',
    name: 'name',
    type: String,
    required: false,
    example: 'John Doe',
  })
  @MaxLength(255, { message: COMMON_MESSAGES.MAX_LENGTH('name', 255) })
  @IsString()
  @IsOptional()
  name?: string;
}
