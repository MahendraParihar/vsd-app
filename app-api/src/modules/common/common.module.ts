import {Module} from '@nestjs/common';
import {commonProvider} from './common.providers';
import {CommonService} from './common.service';

@Module({
    controllers: [],
    providers: [CommonService,
        ...commonProvider],
    exports: [
        CommonService
    ]
})
export class CommonModule {
}
