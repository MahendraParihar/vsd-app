import {Module} from '@nestjs/common';
import {FamilyController} from './controller/family.controller';
import {FamilyService} from './family.service';
import {familyProvider} from './family.providers';
import {commonProvider} from "../common/common.providers";
import {CommonService} from "../common/common.service";

@Module({
  imports: [],
  controllers: [FamilyController],
  providers: [FamilyService,
    ...familyProvider,
    ...commonProvider,
    CommonService]
})
export class FamilyModule {
}
