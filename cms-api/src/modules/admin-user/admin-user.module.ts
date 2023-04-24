import {Module} from '@nestjs/common';
import {AdminUserController} from './admin-user.controller';
import {AdminUserService} from "./admin-user.service";
import {adminUserProvider} from "./admin-user.providers";
import {CommonService} from "../common/common.service";
import {commonProvider} from "../common/common.providers";

@Module({
  controllers: [AdminUserController],
  providers: [
    AdminUserService,
    CommonService,
    ...commonProvider,
    ...adminUserProvider
  ]
})
export class AdminUserModule {
}
