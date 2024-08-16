import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards';
import { TUser } from 'src/interfaces';
import { ChangePasswordDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'API get user profile' })
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getUserProfile(@User() user: TUser) {
    return this.usersService.getUserProfile(user);
  }

  @ApiOperation({ summary: 'API change password' })
  @ApiBody({
    type: ChangePasswordDto,
    required: true,
    description: 'Change password',
  })
  @ApiBearerAuth()
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async changePassword(
    @Body() payload: ChangePasswordDto,
    @User() user: TUser,
  ) {
    return this.usersService.changePassword(payload, user);
  }
}
