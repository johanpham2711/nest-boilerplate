import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, VerifyRegisterDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'API register new user' })
  @ApiBody({
    type: RegisterDto,
    required: true,
    description: 'Register new user',
  })
  @Post('register')
  @HttpCode(200)
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @ApiOperation({ summary: 'API verify register new user' })
  @ApiBody({
    type: VerifyRegisterDto,
    required: true,
    description: 'Verify register new user',
  })
  @Post('register/verify')
  @HttpCode(200)
  async verifyRegister(@Body() payload: VerifyRegisterDto) {
    return this.authService.verifyRegister(payload);
  }
}
