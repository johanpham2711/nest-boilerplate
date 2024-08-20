import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';
import { GetUserByIdQuery } from '../impls/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
