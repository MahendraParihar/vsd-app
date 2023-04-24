import {Module} from '@nestjs/common';
import {FamilyController} from './family.controller';
import {FamilyService} from './family.service';
import {familyProvider} from './family.providers';
import {CommonModule} from '../common/common.module';

@Module({
    controllers: [FamilyController],
    providers: [FamilyService,
        ...familyProvider,
        CommonModule]
})
export class FamilyModule {
}
