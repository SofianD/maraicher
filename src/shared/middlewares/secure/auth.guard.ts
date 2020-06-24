import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const token = context.switchToHttp().getRequest().headers.authorization;
    return token === undefined ? false :
    jwt.verify(
      token,
      '167CD8DC2E719C1CE671DBAEA8437',
      (err, decoded) => {
        return err ? false : true;
      }
    ) as any;
  }
}
