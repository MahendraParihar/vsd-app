import {ADMIN_ROLE_REPOSITORY, ADMIN_USER_REPOSITORY} from '../../constants/config-constants';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {MstAdminRole} from "../../core/database/models/mst-admin-role.model";

export const adminUserProvider = [
  {
    provide: ADMIN_USER_REPOSITORY,
    useValue: MstAdminUser
  },
  {
    provide: ADMIN_ROLE_REPOSITORY,
    useValue: MstAdminRole
  }
];
