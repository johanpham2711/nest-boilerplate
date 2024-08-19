import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { COMMON_MESSAGES } from 'src/messages';

export class ForgotPasswordDto {
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
}
