import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';
import { OTP_EXPIRY, PROCESSOR, QUEUE } from 'src/constants';
import { ILoginResponse, IRegisterResponse } from 'src/interfaces';
import { IMessageResponse } from 'src/interfaces/common/message-response.interface';
import { AUTH_MESSAGE } from 'src/messages';
import { CommonHelper, EncryptHelper, ErrorHelper } from 'src/utils';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, VerifyRegisterDto } from './dtos';
import { CacheService } from 'src/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectQueue(QUEUE.EMAIL_QUEUE)
    private readonly emailQueue: Queue,
    private readonly cacheService: CacheService,
  ) {}

  async register(payload: RegisterDto): Promise<IRegisterResponse> {
    const { email } = payload;

    // Check if user already exists
    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.USER_ALREADY_EXISTS);
    }

    const otp = CommonHelper.generateOtp();
    console.log('🚀 ~ AuthService ~ register ~ otp:', otp);
    // otp expiry in 15 minutes
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + OTP_EXPIRY);

    this.emailQueue.add(PROCESSOR.SEND_VERIFY_REGISTER_EMAIL, {
      data: { email: payload.email, name: payload.name, otp },
    });

    // Encrypt user data
    const hash = EncryptHelper.encryptData(
      JSON.stringify({ ...payload, otp, otpExpiry }),
    );

    return {
      hash,
    };
  }

  async verifyRegister(payload: VerifyRegisterDto): Promise<IMessageResponse> {
    const { hash } = payload;

    // Decrypt user data
    const data = JSON.parse(EncryptHelper.decryptData(hash)) as RegisterDto & {
      otp: string;
      otpExpiry: string;
    };

    // Check if user already exists
    const existingUser = await this.usersService.getUserByEmail(data.email);
    if (existingUser) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.USER_ALREADY_EXISTS);
    }

    // Check OTP
    if (data.otp !== payload.otp) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.INVALID_OTP);
    } else if (new Date() > new Date(data.otpExpiry)) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.OTP_EXPIRED);
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

  async login(payload: LoginDto): Promise<ILoginResponse> {
    const { email, password } = payload;

    // Check if user exists
    const user = await this.usersService.getUserByEmail(email);
    if (user === null) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.USER_NOT_FOUND);
    }

    // Check password
    const isMatchPassword = EncryptHelper.compare(password, user.password);
    if (!isMatchPassword) {
      ErrorHelper.BadRequestException(AUTH_MESSAGE.INVALID_CREDENTIALS);
    }

    return {
      token: {
        accessToken: this.jwtService.sign({ email: user.email }),
      },
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  async logout(token: string | undefined): Promise<IMessageResponse> {
    // Add token to blacklist
    if (token) {
      await this.cacheService.set(
        token,
        'blacklisted',
        this.jwtService.decode(token).exp,
      );
    }

    return {
      message: AUTH_MESSAGE.USER_LOGGED_OUT,
    };
  }
}
