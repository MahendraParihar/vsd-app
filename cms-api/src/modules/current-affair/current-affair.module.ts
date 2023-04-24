import {Module} from '@nestjs/common';
import {CurrentAffairController} from './controller/current-affair.controller';
import {CurrentAffairService} from './current-affair.service';
import {currentAffairProvider} from './current-affair.providers';

@Module({
  controllers: [CurrentAffairController],
  providers: [CurrentAffairService,
    ...currentAffairProvider
  ]
})
export class CurrentAffairModule {
}
