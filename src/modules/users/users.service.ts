import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { TUser } from 'src/interfaces';
import { IMessageResponse } from 'src/interfaces/common/message-response.interface';
import { USER_MESSAGES } from 'src/messages';
import { EncryptHelper, ErrorHelper } from 'src/utils';
import { ChangePasswordDto } from './dtos';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepository.create(data);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUserProfile(user: TUser): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async changePassword(
    payload: ChangePasswordDto,
    user: TUser,
  ): Promise<IMessageResponse> {
    const { password, newPassword } = payload;

    const userFound = await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
    });

    if (!userFound) ErrorHelper.NotFoundException(USER_MESSAGES.USER_NOT_FOUND);

    const isPasswordMatch = EncryptHelper.compare(password, userFound.password);
    if (!isPasswordMatch)
      ErrorHelper.BadRequestException(USER_MESSAGES.OLD_PASSWORD_NOT_MATCH);

    await this.usersRepository.update({
      where: {
        id: user.id,
      },
      data: {
        password: newPassword,
      },
    });

    return {
      message: USER_MESSAGES.USER_CHANGED_PASSWORD,
    };
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.usersRepository.update({
      where: {
        id,
      },
      data,
    });
  }
}
