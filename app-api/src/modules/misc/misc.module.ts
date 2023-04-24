import {Module} from '@nestjs/common';
import {MiscController} from './misc.controller';
import {MiscService} from './misc.service';
import {miscAffairProvider} from './misc.providers';
import {CommonModule} from '../common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [MiscController],
    providers: [MiscService,
        ...miscAffairProvider]
})
export class MiscModule {
}
