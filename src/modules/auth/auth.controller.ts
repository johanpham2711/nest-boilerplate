import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  VerifyForgotPasswordDto,
  VerifyRegisterDto,
} from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'API login' })
  @ApiBody({
    type: LoginDto,
    required: true,
    description: 'Login',
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @ApiOperation({ summary: 'API logout' })
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Req() req: Request) {
    const token = req?.headers?.authorization?.split(' ')[1];

    return this.authService.logout(token);
  }

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

  @ApiOperation({ summary: 'API forgot password' })
  @ApiBody({
    type: ForgotPasswordDto,
    required: true,
    description: 'Forgot password',
  })
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload);
  }

  @ApiOperation({ summary: 'API verify forgot password' })
  @ApiBody({
    type: VerifyForgotPasswordDto,
    required: true,
    description: 'Verify forgot password',
  })
  @Post('forgot-password/verify')
  @HttpCode(200)
  async verifyForgotPassword(@Body() payload: VerifyForgotPasswordDto) {
    return this.authService.verifyForgotPassword(payload);
  }
}
