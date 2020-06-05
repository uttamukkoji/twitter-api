import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserModel } from './models/user.model';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UserModel => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});