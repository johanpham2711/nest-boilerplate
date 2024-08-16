import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';

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
}
