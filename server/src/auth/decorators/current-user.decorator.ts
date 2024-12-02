import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      id: request.user.sub,
      username: request.user.username,
      role: request.user.role,
    };
  },
);
