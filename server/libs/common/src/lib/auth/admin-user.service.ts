import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminUserModel } from '../models/admin';
import { LabelService } from '../label';
import { Op } from 'sequelize';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser, ILogin, LabelKey } from '@vsd-common/lib';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class AdminUserService {
  jwtOptions = {
    secret: jwtConstants.secret,
  };

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
    const token = this.jwtService.sign(
      <IAuthUser>{
        emailId: adminUser.emailId,
        adminUserId: adminUser.adminUserId,
        contactNumber: adminUser.contactNumber,
        profilePicture: adminUser.profilePicture,
        countryCode: adminUser.countryCode,
      },
      this.jwtOptions,
    );
    return { token: token };
  }

  async findByEmailId(userName: string) {
    return await this.adminUserModel.findOne({
      where: {
        emailId: userName,
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

  async loadDetailById(id: number) {
  }

  async manage() {
  }
}
