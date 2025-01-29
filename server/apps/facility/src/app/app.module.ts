import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { FacilityModel } from './models/facility.model';
import { FacilityMemberModel } from './models/facility-member.model';
import { FacilityController } from './controllers/facility.controller';
import { FacilityService } from './controllers/facility.service';

@Module({
  imports: [
    CommonModule.forRoot([
        FacilityModel,
        FacilityMemberModel],
      [],
    ),
    LabelModule.asyncRegister(['admin']),
  ],
  controllers: [AppController, FacilityController],
  providers: [AppService, FacilityService],
})
export class AppModule {}
