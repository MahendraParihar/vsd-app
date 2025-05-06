import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminUserModel } from '../models/admin';
import { LabelService } from '../label';
import { Op } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser, ILogin, LabelKey, IChangePassword } from '@vsd-common/lib';
import { CryptoUtil } from '../utils/crypto.util';
import { Env } from '../utils/env.values';
import { UserStatusEnum } from '../enum/user-status.enum';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(AdminUserModel) private adminUserModel: typeof AdminUserModel,
    private labelService: LabelService,
    private jwtService: JwtService,
  ) {
  }

  async login(user: ILogin) {
    const adminUser = await this.adminUserModel.findOne({
      where: {
        [Op.or]: {
          emailId: user.userName,
          contactNumber: user.userName,
        },
      },
    });
    if (!adminUser) {
      throw new UnauthorizedException();
    }

    const isMatch = await CryptoUtil.compareHash(user.password, adminUser.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const jwtPayload = <IAuthUser>{
      emailId: adminUser.emailId,
      adminUserId: adminUser.adminUserId,
    };

    return {
      accessToken: this.jwtService.sign(jwtPayload, {
        expiresIn: Env.accessTokenTime,
      }),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: Env.refreshTokenTime,
        secret: Env.jwtSecret,
      }),
    };
  }

  async changePassword(user: IChangePassword, userId: number) {
    const adminUser = await this.adminUserModel.findOne({
      where: {
        adminUserId: userId,
        adminUserStatusId: UserStatusEnum.ACTIVE,
      },
    });
    if (!adminUser) {
      throw new UnauthorizedException();
    }

    const isMatch = await CryptoUtil.compareHash(user.password, adminUser.password);

    if (!isMatch) {
      throw new Error();
    }

    const jwtPayload = <IAuthUser>{
      emailId: adminUser.emailId,
      adminUserId: adminUser.adminUserId,
    };

    return {
      accessToken: this.jwtService.sign(jwtPayload, {
        expiresIn: Env.accessTokenTime,
      }),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: Env.refreshTokenTime,
        secret: Env.jwtSecret,
      }),
    };
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.verify(token, { secret: 'refresh_secret' });
    const newAccessToken = this.jwtService.sign({
      emailId: payload.emailId,
      adminUserId: payload.adminUserId,
    }, { expiresIn: '15m' });
    return { accessToken: newAccessToken };
  }

  async findByEmailId(userName: string) {
    return await this.adminUserModel.findOne({
      where: {
        emailId: userName,
        adminUserStatusId: UserStatusEnum.ACTIVE,
      },
    });
  }

  async getById(id: number): Promise<IAuthUser> {
    const adminUser = await this.adminUserModel.findOne({
      where: {
        adminUserId: id,
      },
    });
    if (!adminUser) {
      throw new Error(this.labelService.get(LabelKey.ERROR_NOT_FOUND_ADMIN));
    }
    return <IAuthUser>{
      adminUserId: adminUser.adminUserId,
      emailId: adminUser.emailId,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      contactNumber: adminUser.contactNumber,
      countryCode: adminUser.countryCode,
      profilePicture: adminUser.profilePicture,
    };
  }

  async getByEmail(emailId: string): Promise<IAuthUser> {
    const adminUser = await this.adminUserModel.findOne({
      where: {
        emailId: emailId,
        adminUserStatusId: UserStatusEnum.ACTIVE,
      },
    });
    if (!adminUser) {
      throw new Error(this.labelService.get(LabelKey.ERROR_NOT_FOUND_ADMIN));
    }
    return <IAuthUser>{
      adminUserId: adminUser.adminUserId,
      emailId: adminUser.emailId,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      contactNumber: adminUser.contactNumber,
      countryCode: adminUser.countryCode,
      profilePicture: adminUser.profilePicture,
    };
  }

  async loadDetailById(id: number) {
  }

  async manage() {
  }
}
