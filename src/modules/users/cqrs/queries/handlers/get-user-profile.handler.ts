import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';
import { GetUserProfileQuery } from '../impls/get-user-profile.query';

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler
  implements IQueryHandler<GetUserProfileQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserProfileQuery): Promise<Partial<User>> {
    const { userId } = query;
    return this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
