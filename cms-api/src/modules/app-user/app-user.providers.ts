import {
  APP_USER_DEVICE_REPOSITORY,
  APP_USER_LOGIN_HISTORY_REPOSITORY,
  APP_USER_REPOSITORY
} from '../../constants/config-constants';
import {TxnAppUser} from "../../core/database/models/txn-app-user.model";
import {TxnAppUserDevice} from "../../core/database/models/txn-app-user-device.model";
import {TxnAppUserLoginHistory} from "../../core/database/models/txn-app-user-login-history.model";

export const appUserProvider = [
  {
    provide: APP_USER_REPOSITORY,
    useValue: TxnAppUser
  },
  {
    provide: APP_USER_DEVICE_REPOSITORY,
    useValue: TxnAppUserDevice
  },
  {
    provide: APP_USER_LOGIN_HISTORY_REPOSITORY,
    useValue: TxnAppUserLoginHistory
  }
];
