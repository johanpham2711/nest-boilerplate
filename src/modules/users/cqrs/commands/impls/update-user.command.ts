import { Prisma } from '@prisma/client';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly data: Prisma.UserUpdateInput,
  ) {}
}
