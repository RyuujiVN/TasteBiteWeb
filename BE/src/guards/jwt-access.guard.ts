/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ExecutionContext,
  GoneException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAccessAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info?.name == 'TokenExpiredError')
      throw new GoneException('Need to refresh token!');

    if (info) throw new UnauthorizedException('Invalid token!');
    return user;
  }
}
