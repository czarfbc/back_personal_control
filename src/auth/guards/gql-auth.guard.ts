import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-auth.decorator';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  context(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx;
  }

  getRequest(context: ExecutionContext) {
    const ctx = this.context(context).getContext().req;

    return ctx;
  }

  canActivate(context: ExecutionContext) {
    const [getHandler, getClass] = [
      this.context(context).getHandler(),
      this.context(context).getClass(),
    ];

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      getHandler,
      getClass,
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
