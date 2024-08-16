import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_REGEX } from 'src/constants';
import { COMMON_MESSAGES } from 'src/messages';

export class LoginDto {
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
}
