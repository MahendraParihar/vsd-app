import {Inject, Injectable} from '@nestjs/common';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {AdminUserDTO, AuthAdminUserDTO, AuthAdminUserIdDTO, AuthAdminUserResetPasswordDTO} from './dto/admin-user.dto';
import {
  ADMIN_FORGOT_PASSWORD_REPOSITORY,
  ADMIN_LOGIN_HISTORY_REPOSITORY,
  ADMIN_REPOSITORY,
  IS_DEV,
  OTP_LENGTH
} from '../../constants/config-constants';
import {JwtService} from '@nestjs/jwt';
import {AppUserStatusEnum} from '../../enums/app-user-status';
import {Sequelize} from 'sequelize-typescript';
import {StringResource} from '../../enums/string-resource';
import * as bcrypt from 'bcrypt';
import {Op} from 'sequelize';
import * as moment from 'moment';
import {CryptoUtil} from '../../util/crypto-util';
import {MstAdminUser} from 'src/core/database/models/mst-admin-user.model';
import {IAdminUser} from 'src/response-interface/admin-user.interface';
import {TxnAdminUserLoginHistory} from '../../core/database/models/txn-admin-user-login-history.model';
import {CommonService} from '../common/common.service';
import {TxnAdminUserForgotPasswordOtp} from "../../core/database/models/txn-admin-user-forgot-password-otp.model";

@Injectable()
export class AccountService {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(@Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof MstAdminUser,
              @Inject(ADMIN_LOGIN_HISTORY_REPOSITORY) private readonly adminLoginHistoryRepository: typeof TxnAdminUserLoginHistory,
              @Inject(ADMIN_FORGOT_PASSWORD_REPOSITORY) private readonly adminForgotPasswordRepository: typeof TxnAdminUserForgotPasswordOtp,
              private jwtService: JwtService,
              private commonService: CommonService,
              private sequelize: Sequelize) {
  }

  public async login(authLoginDto: AuthAdminUserDTO, ipAddress: string): Promise<IServerResponse> {

    let res: IServerResponse;

    try {
      let user: MstAdminUser = await this.findOneByEmail(authLoginDto.emailId);
      if (!user) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_NOT_PRESENT,
          data: null
        };
        return res;
      }

      switch (user.adminUserStatusId) {
        case AppUserStatusEnum.ACTIVE:
          // find if user password match
          const match = await this.comparePassword(authLoginDto.password, user.password);
          if (!match) {
            res = {
              code: ServerResponseEnum.WARNING,
              message: StringResource.INVALID_USER,
              data: null
            };
            return res;
          }

          const loginEntry = {
            adminId: user.adminId,
            createdIp: ipAddress
          };

          await this.createLoginEntry(loginEntry);

          const adminUserI: IAdminUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            imagePath: user.imagePath,
            roleId: user.roleId,
            authToken: await this.generateToken(user.adminId)
          };
          res = {
            code: ServerResponseEnum.SUCCESS,
            message: ServerResponseEnum.SUCCESS,
            data: adminUserI
          };
          return res;
        case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
          res = {
            code: ServerResponseEnum.ACCOUNT_VERIFICATION_PENDING,
            message: StringResource.ACOUNT_NOT_VERIFIED,
            data: null
          };
          return res;
        case AppUserStatusEnum.IN_ACTIVE:
          res = {
            code: ServerResponseEnum.WARNING,
            message: user.deactiveReason,
            data: null
          };
          return res;
      }
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async signUp(user: AdminUserDTO): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let checkUser = await this.findOneByEmail(user.emailId);
      if (checkUser) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_ALREADY_PRESENT,
          data: null
        };
        return res;
      }

      // if no password then generate new password
      // if (!user.password) {
      user.password = user.firstName.trim() + '@' + '123';
      // }
      const pass = await this.hashPassword(user.password);
      user = {...user, password: pass};

      // generate verification code
      user.verificationCode = this.generateRandomNumber(6);

      // create user if all good
      const tempUser = await this.createUser(user);

      if (!tempUser) {
        res = {
          code: ServerResponseEnum.ERROR,
          message: StringResource.SOMETHING_WENT_WRONG,
          data: null
        };
        return res;
      }
      // tslint:disable-next-line: no-string-literal
      const {password, ...result} = tempUser['dataValues'];

      // generate token
      const token = await this.generateEmailConformationLink(tempUser.emailId, user.verificationCode);

      // deleting password from response object
      delete result.password;

      /*if (user.address && user.cityVillageId) {
          const adminAddress: AddressDto = {
              addressTypeId: user.addressTypeId ? user.addressTypeId : AddressTypeEnum.PERMANENT_ADDRESS,
              address: user.address,
              cityVillageId: user.cityVillageId,
              countryId: user.countryId,
              pinCode: user.pinCode,
              tableId: TableEnum.MST_ADMIN,
              pkOfTable: tempUser.adminId,
              latitude: user.latitude ? user.latitude : null,
              longitude: user.longitude ? user.longitude : null
          };

          const adminAdd = await this.commonService.addAddress(adminAddress);
          if (adminAdd) {
              await this.adminRepository.update(
                  {
                      addressId: adminAdd.addressId
                  },
                  {
                      where: {
                          adminId: tempUser.adminId
                      }
                  });
          }
      }*/
      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS_VERIFICATION_CODE_SENT,
        data: IS_DEV ? token : null
      };
      return res;

    } catch (e) {
      if (IS_DEV) {
        console.log(e);
      }
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async verifyAccount(token: string, cIP: string): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      const toDecode = await this.jwtService.verify(token);
      console.log(toDecode);
      const emailId = toDecode.emailId;
      const otp = toDecode.otp;

      let user: MstAdminUser = await this.findOneByEmail(emailId);

      if (!user) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_NOT_PRESENT,
          data: null
        };
        return res;
      }

      switch (user.adminUserStatusId) {
        case AppUserStatusEnum.IN_ACTIVE:
          res = {
            code: ServerResponseEnum.WARNING,
            message: user.deactiveReason,
            data: null
          };
          break;
        case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
          if (otp === user.verificationCode) {
            const update = await this.adminRepository.update(
              {
                verificationCode: null,
                modifiedIp: cIP,
                adminUserStatusId: AppUserStatusEnum.ACTIVE
              }, {
                where: {
                  emailId: emailId,
                  adminUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
                }
              });
            if (update) {
              res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS_ACCOUNT_VERIFICATION,
                data: null
              };
            } else {
              res = {
                code: ServerResponseEnum.ERROR,
                message: StringResource.SOMETHING_WENT_WRONG,
                data: null
              };
            }
          } else {
            res = {
              code: ServerResponseEnum.WARNING,
              message: StringResource.INVALID_VERIFICATION_CODE,
              data: null
            };
          }
          break;
        case AppUserStatusEnum.ACTIVE:
        default:
          res = {
            code: ServerResponseEnum.WARNING,
            message: StringResource.ACCOUNT_ALREADY_ACTIVE,
            data: null
          };
          break;
      }
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async resendVerificationOtp(authLoginDto: AuthAdminUserIdDTO, cIp: string): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let user: MstAdminUser = await this.findOneByEmail(authLoginDto.emailId);

      if (!user) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_NOT_PRESENT,
          data: null
        };
        return res;
      }

      switch (user.adminUserStatusId) {
        case AppUserStatusEnum.IN_ACTIVE:
          res = {
            code: ServerResponseEnum.WARNING,
            message: user.deactiveReason,
            data: null
          };
          break;
        case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
          const newOtp = this.generateRandomNumber(OTP_LENGTH);
          const update = await this.adminRepository.update(
            {
              verificationCode: newOtp,
              modifiedIp: cIp
            }, {
              where: {
                emailId: authLoginDto.emailId,
                adminUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
              }
            });
          if (update) {
            const token = await this.generateEmailConformationLink(authLoginDto.emailId, newOtp);
            res = {
              code: ServerResponseEnum.SUCCESS,
              message: StringResource.SUCCESS_VERIFICATION_CODE_SENT,
              data: IS_DEV ? token : null
            };
          } else {
            res = {
              code: ServerResponseEnum.ERROR,
              message: StringResource.SOMETHING_WENT_WRONG,
              data: null
            };
          }
          break;
        case AppUserStatusEnum.ACTIVE:
        default:
          res = {
            code: ServerResponseEnum.SUCCESS,
            message: StringResource.ACCOUNT_ALREADY_ACTIVE,
            data: null
          };
          break;
      }
      return res;

    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async sendForgotPasswordOtp(authLoginDto: AuthAdminUserIdDTO, cIp: string): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let user: MstAdminUser = await this.findOneByEmail(authLoginDto.emailId);
      if (!user) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_NOT_PRESENT,
          data: null
        };
        return res;
      }

      switch (user.adminUserStatusId) {
        case AppUserStatusEnum.ACTIVE:
          // Generate OTP and send via mail
          await this.inactiveLastOtpByOtp(user.adminId);
          const otp = this.generateRandomNumber(OTP_LENGTH);
          const createObj = {
            adminId: user.adminId,
            otp: otp,
            createdIp: cIp
          };
          const createEntry = await this.createForgotPasswordOtpEntry(createObj);
          if (createEntry) {
            res = {
              code: ServerResponseEnum.SUCCESS,
              message: StringResource.SUCCESS,
              data: IS_DEV ? otp : null
            };
          } else {
            res = {
              code: ServerResponseEnum.ERROR,
              message: StringResource.SOMETHING_WENT_WRONG,
              data: null
            };
          }
          return res;
        case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
          res = {
            code: ServerResponseEnum.ACCOUNT_VERIFICATION_PENDING,
            message: StringResource.ACOUNT_NOT_VERIFIED,
            data: null
          };
          return res;
        case AppUserStatusEnum.IN_ACTIVE:
          res = {
            code: ServerResponseEnum.WARNING,
            message: user.deactiveReason,
            data: null
          };
          return res;
      }
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }

  }

  public async resetPassword(authLoginDto: AuthAdminUserResetPasswordDTO, cIp: string): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let user: MstAdminUser = await this.findOneByEmail(authLoginDto.emailId);
      if (!user) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_NOT_PRESENT,
          data: null
        };
        return res;
      }

      switch (user.adminUserStatusId) {
        case AppUserStatusEnum.ACTIVE:
          if (authLoginDto.password !== authLoginDto.repeatPassword) {
            res = {
              code: ServerResponseEnum.WARNING,
              message: StringResource.REPEAT_PASSWORD_NOT_MATCH,
              data: null
            };
            return res;
          }

          const activeOtpObj = await this.findLastActiveOtp(user.adminId, authLoginDto.otp);
          if (activeOtpObj && activeOtpObj.otp !== authLoginDto.otp) {
            res = {
              code: ServerResponseEnum.WARNING,
              message: StringResource.INVALID_OTP,
              data: null
            };
            return res;
          }

          const hashPassword = await this.hashPassword(authLoginDto.password);

          const updateEntry = await this.adminRepository.update({
            password: hashPassword,
            modifiedIp: cIp
          }, {
            where: {
              adminId: user.adminId,
              adminUserStatusId: AppUserStatusEnum.ACTIVE
            }
          });
          if (updateEntry) {
            await this.inactiveLastOtpByOtp(user.adminId);
            res = {
              code: ServerResponseEnum.SUCCESS,
              message: StringResource.SUCCESS,
              data: null
            };
          } else {
            res = {
              code: ServerResponseEnum.ERROR,
              message: StringResource.SOMETHING_WENT_WRONG,
              data: null
            };
          }
          return res;
        case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
          res = {
            code: ServerResponseEnum.ACCOUNT_VERIFICATION_PENDING,
            message: StringResource.ACOUNT_NOT_VERIFIED,
            data: null
          };
          return res;
        case AppUserStatusEnum.IN_ACTIVE:
          res = {
            code: ServerResponseEnum.WARNING,
            message: user.deactiveReason,
            data: null
          };
          return res;
      }
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }

  }

  public async findOneById(adminId: number): Promise<MstAdminUser> {
    return await this.adminRepository.findOne<MstAdminUser>({where: {adminId: adminId}});
  }

  private async generateToken(userIdIn: number) {
    const payload = {
      userId: userIdIn,
    };
    return CryptoUtil.encryptUsingAES256(await this.jwtService.signAsync(payload));
  }

  private async generateEmailConformationLink(emailId: string, randamNumber: string) {
    const payload = {
      emailId: emailId,
      otp: randamNumber
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  private async findOneByEmail(emailId: string): Promise<MstAdminUser> {
    return await this.adminRepository.findOne<MstAdminUser>({where: {emailId: emailId}});
  }

  // create app user
  private async createUser(user) {
    return await this.adminRepository.create(user);
  }

  private async createLoginEntry(loginEntry) {
    await this.adminLoginHistoryRepository.create(loginEntry);
  }

  private async createForgotPasswordOtpEntry(forgotPasswordObj) {
    return await this.adminForgotPasswordRepository.create(forgotPasswordObj);
  }

  // inactive last forgot password otp by Otp
  private async inactiveLastOtpByOtp(appUserIdIn: number) {
    await this.adminForgotPasswordRepository.update(
      {
        active: false
      }, {
        where: {
          adminId: appUserIdIn,
          active: true
        }
      });
  }

  private async findLastActiveOtp(appUserIdIn: number, otpIn: string) {
    const fromDate = moment().subtract(30 * 60, 'minute').format();
    const toDate = moment().format();
    return this.adminForgotPasswordRepository.findOne<TxnAdminUserForgotPasswordOtp>({
      where: {
        adminId: appUserIdIn,
        active: true,
        otp: otpIn,
        createdAt: {
          [Op.between]: [fromDate, toDate]
        }
      }
    });
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  // generate random number
  private generateRandomNumber(numberLength: number): string {
    let text = "";
    let possible = "123456789";
    for (let i = 0; i < numberLength; i++) {
      let sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return text;
  }

  private isEmailLogin(userId: string): boolean {
    const reg = new RegExp(this.emailPattern);
    return userId.match(reg) ? true : false;
  }
}
