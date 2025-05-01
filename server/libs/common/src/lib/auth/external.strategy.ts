import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { IAuthUser } from '@vsd-common/lib';
import { JwtService } from '@nestjs/jwt';
import { extractLocalJwtFromHeader } from '../utils/auth.util';

export class ExternalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async validate(request: Request): Promise<IAuthUser> {
    const details = extractLocalJwtFromHeader(request);
    return <IAuthUser>{};
  }
}
