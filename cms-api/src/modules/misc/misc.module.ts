import {Module} from '@nestjs/common';
import {MiscService} from './misc.service';
import {miscProvider} from './misc.providers';
import {CommonModule} from '../common/common.module';
import {FaqController} from "./controller/faq.controller";
import {InquiryController} from "./controller/inquiry.controller";
import {LegalPageController} from "./controller/legal-page.controller";

@Module({
  imports: [CommonModule],
  controllers: [
    InquiryController,
    LegalPageController,
    FaqController
  ],
  providers: [MiscService,
    ...miscProvider]
})
export class MiscModule {
}
