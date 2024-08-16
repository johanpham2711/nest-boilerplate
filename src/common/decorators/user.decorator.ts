import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TUser } from 'src/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const User = createParamDecorator<any, any, TUser>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
