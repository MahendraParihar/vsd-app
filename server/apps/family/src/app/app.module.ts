import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { FamilyAddictionMappingModel } from './models/family-addiction-mapping.model';
import { FamilyBusinessModel } from './models/family-business.model';
import { FamilyBusinessMappingModel } from './models/family-business-mapping.model';
import { FamilyContactNumberModel } from './models/family-contact-number.model';
import { FamilyEducationModel } from './models/family-education.model';
import { FamilyRelationshipMappingModel } from './models/family-relationship-mapping.model';
import { FamilyServiceMappingModel } from './models/family-service-mapping.model';
import { FamilyController } from './controllers/family.controller';

@Module({
  imports: [
    CommonModule.forRoot(
      [
        FamilyAddictionMappingModel,
        FamilyBusinessModel,
        FamilyBusinessMappingModel,
        FamilyContactNumberModel,
        FamilyEducationModel,
        FamilyRelationshipMappingModel,
        FamilyServiceMappingModel,
      ],
      [],
    ),
    LabelModule.asyncRegister(['admin']),
  ],
  controllers: [AppController, FamilyController],
  providers: [AppService],
})
export class AppModule {}
