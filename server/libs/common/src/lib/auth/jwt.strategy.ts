import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { IAuthUser } from '@vsd-common/lib';
import { UnauthorizedException } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AdminUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload) {
    if (payload) {
      return <IAuthUser>{
        emailId: payload.emailId,
        adminUserId: payload.adminUserId,
        contactNumber: payload.contactNumber,
        profilePicture: payload.profilePicture,
        countryCode: payload.countryCode,
      };
    }
    // const adminUser = await this.authService.findByEmailId(payload.emailId);
    // if (adminUser) {
    //   return <IAuthUser>{
    //     emailId: payload.emailId,
    //     adminUserId: payload.adminUserId,
    //     contactNumber: payload.contactNumber,
    //     profilePicture: payload.profilePicture,
    //     countryCode: payload.countryCode,
    //   };
    // }
    throw new UnauthorizedException();
  }
}
