import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from './user-info.interface';

export const GetUserInfo = createParamDecorator((data, ctx: ExecutionContext): UserInfo => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});