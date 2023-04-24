import {Module} from '@nestjs/common';
import {commonProvider} from './common.providers';
import {CommonService} from './common.service';
import {CommonController} from './controller/common.controller';
import {ExceptionService} from './exception.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService, ExceptionService, ...commonProvider],
  exports: [CommonService, ExceptionService, ...commonProvider],
})
export class CommonModule {
}
