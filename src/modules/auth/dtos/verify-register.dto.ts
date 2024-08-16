import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { COMMON_MESSAGES } from 'src/messages';

export class VerifyRegisterDto {
  @ApiProperty({
    description: 'Hash from register',
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
}
