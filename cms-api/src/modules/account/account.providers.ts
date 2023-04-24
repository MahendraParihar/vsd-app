import {MstAdminUser} from 'src/core/database/models/mst-admin-user.model';
import {
  ADMIN_FORGOT_PASSWORD_REPOSITORY,
  ADMIN_LOGIN_HISTORY_REPOSITORY,
  ADMIN_REPOSITORY
} from '../../constants/config-constants';
import {TxnAdminUserLoginHistory} from '../../core/database/models/txn-admin-user-login-history.model';
import {TxnAdminUserForgotPasswordOtp} from "../../core/database/models/txn-admin-user-forgot-password-otp.model";

export const accountProvider = [
  {
    provide: ADMIN_REPOSITORY,
    useValue: MstAdminUser,
  },
  {
    provide: ADMIN_LOGIN_HISTORY_REPOSITORY,
    useValue: TxnAdminUserLoginHistory,
  },
  {
    provide: ADMIN_FORGOT_PASSWORD_REPOSITORY,
    useValue: TxnAdminUserForgotPasswordOtp,
  }
];
