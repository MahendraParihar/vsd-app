import {ACCOUNT_REPOSITORY, AUTH_OTP_REPOSITORY} from '../../core/constants/config-constants';
import {JwtService} from '@nestjs/jwt';
import {TxnAppUser} from '../../core/database/models/txn-app-user.model';
import {TxnAppUserLoginOtp} from '../../core/database/models/txn-app-user-login-otp.model';

export const accountProvider = [
    {
        provide: ACCOUNT_REPOSITORY,
        useValue: TxnAppUser,
    },
    {
        provide: AUTH_OTP_REPOSITORY,
        useValue: TxnAppUserLoginOtp,
    }
];