import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthUser } from '@vsd-common/lib';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { Env } from '../utils/env.values';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AdminUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Env.jwtSecret,
    });
  }

  async validate(payload) {
    console.log('---------------------', payload);
    const adminUser = await this.authService.findByEmailId(payload.emailId);
    if (!adminUser) {
      throw new UnauthorizedException();
    }
    if (payload) {
      return <IAuthUser>{
        emailId: payload.emailId,
        adminUserId: payload.adminUserId,
        contactNumber: payload.contactNumber,
        profilePicture: payload.profilePicture,
        countryCode: payload.countryCode,
      };
    }
  }
}
