import {Inject, Injectable} from '@nestjs/common';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {AppUserDTO, AuthAppUserDTO, AuthAppUserIdDTO} from './dto/app-user.dto';
import {TxnAppUser} from '../../core/database/models/txn-app-user.model';
import {TxnAppUserLoginOtp} from '../../core/database/models/txn-app-user-login-otp.model';
import {ACCOUNT_REPOSITORY, AUTH_OTP_REPOSITORY, IS_DEV, OTP_LENGTH} from '../../core/constants/config-constants';
import {JwtService} from '@nestjs/jwt';
import {AppUserStatusEnum} from '../../enums/app-user-status';
import {Sequelize} from 'sequelize-typescript';
import {StringResource} from '../../enums/string-resource';
import {AppUserLoginOtpDto} from './dto/app-user-login-otp.dto';
import * as bcrypt from 'bcrypt';
import {Op} from 'sequelize';
import * as moment from 'moment';
import {CryptoUtil} from '../../util/crypto-util';

@Injectable()
export class AccountService {

    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(@Inject(ACCOUNT_REPOSITORY) private readonly accountRepository: typeof TxnAppUser,
                @Inject(AUTH_OTP_REPOSITORY) private readonly authOtpRepository: typeof TxnAppUserLoginOtp,
                private jwtService: JwtService,
                private sequelize: Sequelize) {

    }


    public async sendSignInOtp(authLoginDto: AuthAppUserIdDTO, cIp: string): Promise<IServerResponse> {
        let res: IServerResponse;

        try {
            let user: TxnAppUser = await this.getAuthUser(authLoginDto);

            if (!user) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.ACCOUNT_NOT_PRESENT,
                    data: null
                };
                return res;
            }

            switch (user.appUserStatusId) {
                case AppUserStatusEnum.IN_ACTIVE:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: user.deactiveReason,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_ADMIN_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.ACTIVE:
                default:
                    // Generate OTP
                    const otp: string = this.generateRandomNumber(OTP_LENGTH);
                    const authOtpObj = new AppUserLoginOtpDto();
                    authOtpObj.appUserId = Number(user.appUserId);
                    authOtpObj.verificationCode = otp;
                    authOtpObj.createdIp = cIp;
                    await this.inactiveLastAuthOtp(user.appUserId);
                    const createOtp = await this.createAuthOtp(authOtpObj);
                    if (createOtp) {
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

    public async login(authLoginDto: AuthAppUserDTO): Promise<IServerResponse> {

        let res: IServerResponse;

        try {
            const isEmailLogin = this.isEmailLogin(authLoginDto.userId);
            let user: TxnAppUser = await this.getAuthUser(authLoginDto);

            if (!user) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.ACCOUNT_NOT_PRESENT,
                    data: null
                };
                return res;
            }

            switch (user.appUserStatusId) {
                case AppUserStatusEnum.IN_ACTIVE:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: user.deactiveReason,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_ADMIN_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.ACTIVE:
                    const latestOtp = await this.findLastActiveAuthOtp(user.appUserId, authLoginDto.otp);
                    if (latestOtp) {
                        // await this.inactiveLastAuthOtpByOtp(user.appUserId, authLoginDto.otp);
                        const token = await this.generateToken(user.id);
                        user.password = null;
                        const enp = await CryptoUtil.encrypt(user.firstName);
                        const dnp = await CryptoUtil.decrypt(enp);
                        const outputObj = {
                            enp1: enp,
                            dnp1: dnp,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            appUserId: user.appUserId,
                            emailId: user.emailId,
                            contactNo: user.contactNo,
                            cityVillageId: user.cityVillageId,
                            accessToken: token,
                        };
                        res = {
                            code: ServerResponseEnum.SUCCESS,
                            message: StringResource.SUCCESS,
                            data: outputObj
                        };
                    } else {
                        res = {
                            code: ServerResponseEnum.WARNING,
                            message: StringResource.INVALID_VERIFICATION_CODE,
                            data: null
                        };
                    }
                    break;
            }

            /*// find if user password match
            const match = await this.comparePassword(password, user.password);
            if (!match) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: 'user id and password not matched',
                    data: null
                };
                return res;
            }*/
            user = null;
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

    public async signUp(user: AppUserDTO): Promise<IServerResponse> {
        let res: IServerResponse;
        try {

            let checkUser = await this.findAllByEmailIdContactNumber(user.emailId, user.contactNo);
            if (checkUser && checkUser.length > 1) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.ACCOUNT_ALREADY_PRESENT,
                    data: null
                };
                return res;
            }

            // check if user is inactive by admin
            const sTemp = checkUser.find((item: TxnAppUser) => item.appUserStatusId === AppUserStatusEnum.IN_ACTIVE);
            if (sTemp) {
                res = {
                    code: ServerResponseEnum.ERROR,
                    message: StringResource.ACCOUNT_IN_ACTIVE,
                    data: sTemp.deactiveReason
                };
                return res;
            }

            // if no password then generate new password
            if (!user.password) {
                user.password = user.firstName + '@' + this.generateRandomNumber(6);
            }
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
            // const token = await this.generateToken(result.appUserId);

            // deleting password from response object
            delete result.password;

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS_VERIFICATION_CODE_SENT,
                data: IS_DEV ? result.verificationCode : null
            };
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

    public async verifyAccount(authLoginDto: AuthAppUserDTO, cIP: string): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const isEmailLogin = this.isEmailLogin(authLoginDto.userId);
            let user: TxnAppUser = await this.getAuthUser(authLoginDto);

            if (!user) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.ACCOUNT_NOT_PRESENT,
                    data: null
                };
                return res;
            }

            switch (user.appUserStatusId) {
                case AppUserStatusEnum.IN_ACTIVE:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: user.deactiveReason,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_ADMIN_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
                    if (authLoginDto.otp === user.verificationCode) {
                        let whereC = {};
                        if (isEmailLogin) {
                            whereC = {
                                emailId: authLoginDto.userId,
                                appUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
                            };
                        } else {
                            whereC = {
                                contactNo: authLoginDto.userId,
                                appUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
                            };
                        }
                        const update = await this.accountRepository.update(
                            {
                                verificationCode: null,
                                modifiedIp: cIP,
                                appUserStatusId: AppUserStatusEnum.PENDING_FOR_ADMIN_VARIFICATION
                            }, {
                                where: whereC
                            });
                        if (update) {
                            res = {
                                code: ServerResponseEnum.SUCCESS,
                                message: StringResource.SUCCESS_OTP_VERIFICATION,
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

    public async resendVerificationOtp(authLoginDto: AuthAppUserIdDTO, cIp: string): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            let user: TxnAppUser = await this.getAuthUser(authLoginDto);
            const isEmailLogin = this.isEmailLogin(authLoginDto.userId);
            if (!user) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.ACCOUNT_NOT_PRESENT,
                    data: null
                };
                return res;
            }

            switch (user.appUserStatusId) {
                case AppUserStatusEnum.IN_ACTIVE:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: user.deactiveReason,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_ADMIN_VARIFICATION:
                    res = {
                        code: ServerResponseEnum.WARNING,
                        message: StringResource.PENDING_FOR_ADMIN_VERIFICATION,
                        data: null
                    };
                    break;
                case AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION:
                    const newOtp = this.generateRandomNumber(OTP_LENGTH);
                    let whereC = {};
                    if (isEmailLogin) {
                        whereC = {
                            emailId: authLoginDto.userId,
                            appUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
                        };
                    } else {
                        whereC = {
                            contactNo: authLoginDto.userId,
                            appUserStatusId: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
                        };
                    }
                    const update = await this.accountRepository.update(
                        {
                            verificationCode: newOtp,
                            modifiedIp: cIp
                        }, {
                            where: whereC
                        });
                    if (update) {
                        res = {
                            code: ServerResponseEnum.SUCCESS,
                            message: StringResource.SUCCESS_VERIFICATION_CODE_SENT,
                            data: IS_DEV ? newOtp : null
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
            }
        }
        return res;
    }

    private async generateToken(userIdIn: number) {
        const payload = {
            userId: userIdIn,
        };
        const token = await this.jwtService.signAsync(payload);
        // const token = 'kljflksjflksjflkdsjflkdsjfslkdjfslkdjflkdsjflkd';
        return token;
    }

    private async findOneByEmail(emailId: string): Promise<TxnAppUser> {
        return await this.accountRepository.findOne<TxnAppUser>({where: {emailId: emailId}});
    }

    private async findOneById(appUserId: number): Promise<TxnAppUser> {
        return await this.accountRepository.findOne<TxnAppUser>({where: {appUserId: appUserId}});
    }

    private async findOneByContactNumber(contactNumber: string): Promise<TxnAppUser> {
        return await this.accountRepository.findOne<TxnAppUser>({where: {contactNo: contactNumber}});
    }

    private async findAllByEmailIdContactNumber(emailIdIn: string, contactNoIn: string): Promise<TxnAppUser[]> {
        return await this.accountRepository.findAll<TxnAppUser>({
            where: {
                [Op.or]: [{emailId: emailIdIn}, {contactNo: contactNoIn}]
            }
        });
    }

    // create app user
    private async createUser(user) {
        return await this.accountRepository.create(user);
    }

    // create app user login otp
    private async createAuthOtp(authOtpObj) {
        return await this.authOtpRepository.create(authOtpObj);
    }

    // inactive last active auth otp
    private async inactiveLastAuthOtp(appUserIdIn: number) {
        await this.authOtpRepository.update(
            {
                active: false
            }, {
                where: {
                    appUserId: appUserIdIn,
                    active: true
                }
            })
    }

    // inactive last active auth otp by Otp
    private async inactiveLastAuthOtpByOtp(appUserIdIn: number, otpIn: string) {
        await this.authOtpRepository.update(
            {
                active: false
            }, {
                where: {
                    appUserId: appUserIdIn,
                    active: true,
                    verificationCode: otpIn
                }
            })
    }

    private async findLastActiveAuthOtp(appUserIdIn: number, otpIn: string) {
        const fromDate = moment().subtract(30 * 60, 'minute').format();
        const toDate = moment().format();
        return this.authOtpRepository.findOne<TxnAppUserLoginOtp>({
            where: {
                appUserId: appUserIdIn,
                active: true,
                verificationCode: otpIn,
                createdAt: {
                    [Op.between]: [fromDate, toDate]
                }
            }
        })
    }

    private async getAuthUser(authLoginDto: AuthAppUserIdDTO): Promise<TxnAppUser> {
        let user: TxnAppUser = null;
        try {
            const isEmailLogin = this.isEmailLogin(authLoginDto.userId);
            const reg = new RegExp(this.emailPattern);
            if (authLoginDto.userId.match(reg)) {
                user = await this.findOneByEmail(authLoginDto.userId);
            } else {
                user = await this.findOneByContactNumber(authLoginDto.userId);
            }
        } catch (e) {

        }
        return user;
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
