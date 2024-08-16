import { Injectable } from '@nestjs/common';
import { IRegisterResponse } from 'src/interfaces';
import { AUTH_MESSAGE } from 'src/messages';
import { CommonHelper, EncryptHelper, ErrorHelper } from 'src/utils';
import { UsersService } from '../users';
import { RegisterDto, VerifyRegisterDto } from './dtos';
import { IMessageResponse } from 'src/interfaces/common/message-response.interface';

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
    console.log('🚀 ~ AuthService ~ register ~ otp:', otp);

    // Encrypt user data
    const hash = EncryptHelper.encryptData(JSON.stringify({ ...payload, otp }));

    return {
      hash,
    };
  }

  async verifyRegister(payload: VerifyRegisterDto): Promise<IMessageResponse> {
    const { hash } = payload;

    // Decrypt user data
    const data = JSON.parse(EncryptHelper.decryptData(hash)) as RegisterDto & {
      otp: string;
    };

    // Check if user already exists
    const existingUser = await this.usersService.getUserByEmail(data.email);
    if (existingUser) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.USER_ALREADY_EXISTS);
    }

    // Check OTP
    if (data.otp !== payload.otp) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.INVALID_OTP);
    }

    // Create new user
    await this.usersService.createUser({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    return {
      message: AUTH_MESSAGE.USER_REGISTERED,
    };
  }
}
