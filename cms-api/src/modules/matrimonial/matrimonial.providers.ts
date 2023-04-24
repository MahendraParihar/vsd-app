import {MATRIMONIAL_REPOSITORY} from '../../constants/config-constants';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";

export const matrimonialProvider = [
  {
    provide: MATRIMONIAL_REPOSITORY,
    useValue: MstAdminUser
  }
];
