import {Module} from '@nestjs/common';
import {MandalController} from './controller/mandal.controller';
import {mandalProvider} from "./mandal.providers";
import {MandalService} from "./mandal.service";
import {CommonService} from "../common/common.service";
import {MandalMemberController} from "./controller/mandal-member.controller";
import {commonProvider} from "../common/common.providers";

@Module({
  controllers: [MandalController, MandalMemberController],
  providers: [
    ...mandalProvider,
    ...commonProvider,
    MandalService,
    CommonService
  ]
})
export class MandalModule {
}
