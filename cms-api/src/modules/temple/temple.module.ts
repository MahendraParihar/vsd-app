import {Module} from '@nestjs/common';
import {TempleController} from './temple.controller';
import {templeProvider} from "./temple.providers";
import {TempleService} from "./temple.service";
import {CommonService} from "../common/common.service";
import {commonProvider} from "../common/common.providers";

@Module({
  controllers: [TempleController],
  providers: [...templeProvider,
    ...commonProvider,
    TempleService,
    CommonService]
})
export class TempleModule {
}
