import { defaultPagination } from '@common/constants';
import { IPaginationResponse, IRepository } from '@common/interfaces';
import { PrismaService } from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository implements IRepository<User> {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findOne(query?: Prisma.UserFindFirstArgs): Promise<User | null> {
    return this.prisma.user.findFirst(query);
  }

  async findMany(query?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(query);
  }

  async pagination(params: {
    page?: number;
    pageSize?: number;
    cursor?: User;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<IPaginationResponse<User>> {
    const {
      page = defaultPagination.page,
      pageSize = defaultPagination.pageSize,
      cursor,
      where,
      orderBy,
    } = params;

    const skip = (page - 1) * pageSize;

    const [items, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        cursor,
        where,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items,
      page,
      pageSize,
      total: count,
    };
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }

  async delete(query: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where: query });
  }
}
