import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards';
import { User } from 'src/common/decorators';
import { TUser } from 'src/interfaces';

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
}
