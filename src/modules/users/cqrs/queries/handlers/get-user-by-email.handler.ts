import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';
import { GetUserByEmailQuery } from '../impls';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    const { email } = query;
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
