import { ChangePasswordDto } from 'src/modules/users/dtos';

export class ChangePasswordCommand {
  constructor(
    public readonly userId: string,
    public readonly payload: ChangePasswordDto,
  ) {}
}
