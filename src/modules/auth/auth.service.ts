import { Injectable } from '@nestjs/common';
import { IRegisterResponse } from 'src/interfaces';
import { AUTH_MESSAGE } from 'src/messages';
import { CommonHelper, EncryptHelper, ErrorHelper } from 'src/utils';
import { UsersService } from '../users';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(payload: RegisterDto): Promise<IRegisterResponse> {
    const { email } = payload;

    // Check if user already exists
    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.USER_ALREADY_EXISTS);
    }

    const otp = CommonHelper.generateOtp();

    // Encrypt user data
    const hash = EncryptHelper.encryptData(JSON.stringify({ ...payload, otp }));

    return {
      hash,
    };
  }
}
