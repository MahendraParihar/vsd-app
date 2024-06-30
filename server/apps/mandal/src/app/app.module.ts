import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CommonModule, LabelModule} from '@server/common';
import {MandalModel} from './models/mandal.model';
import {MandalMemberModel} from './models/mandal-member.model';
import {TrusteeModel} from './models/trustee.model';
import {MandalService} from './mandal/mandal.service';
import {MandalController} from './mandal/mandal.controller';
import {CityVillageChovtiyaModel} from "./models/city-village-chovtiya.model";

@Module({
  imports: [CommonModule.forRoot([MandalModel, MandalMemberModel, TrusteeModel, CityVillageChovtiyaModel], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [AppController, MandalController],
  providers: [AppService, MandalService],
})
export class AppModule {
}
