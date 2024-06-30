import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AddictionService,
  AddressTypeService,
  BusinessService,
  CasteService,
  CityVillageService,
  CommonModule,
  ContactTypeService,
  CountryService,
  DistrictService,
  EducationDegreeService,
  FaqCategoryService,
  GenderService,
  GotraService,
  JobCategoryService,
  JobSubCategoryService,
  JobTypeService, LabelModule,
  MatrimonialRequestedStatusService,
  MatrimonialStatusService,
  MediaSrcService,
  PostService,
  RaasiService,
  RelationshipService,
  ReligionService,
  ServiceService,
  StateService,
} from '@server/common';
import { AddictionController } from './addiction/addiction.controller';
import { BusinessController } from './business/business.controller';
import { CasteController } from './caste/caste.controller';
import { EducationDegreeController } from './education-degree/education-degree.controller';
import { GenderController } from './gender/gender.controller';
import { GotraController } from './gotra/gotra.controller';
import { RaasiController } from './raasi/raasi.controller';
import { RelationshipController } from './relationship/relationship.controller';
import { ReligionController } from './religion/religion.controller';
import { ServiceController } from './service/service.controller';
import { FaqCategoryController } from './faq-category/faq-category.controller';
import { JobCategoryController } from './job-category/job-category.controller';
import { JobSubCategoryController } from './job-sub-category/job-sub-category.controller';
import { JobTypeController } from './job-type/job-type.controller';
import { AddressTypeController } from './address-type/address-type.controller';
import { CityVillageController } from './city-village/city-village.controller';
import { CountryController } from './country/country.controller';
import { DistrictController } from './district/district.controller';
import { StateController } from './state/state.controller';
import { PostController } from './post/post.controller';
import { MatrimonialStatusController } from './matrimonial-status/matrimonial-status.controller';
import {
  MatrimonialRequestedStatusController,
} from './matrimonial-requested-status/matrimonial-requested-status.controller';
import { ContactTypeController } from './contact-type/contact-type.controller';
import { JobStatusController } from './job-status/job-status.controller';
import { MaritalStatusController } from './marital-status/marital-status.controller';

@Module({
  imports: [CommonModule.forRoot([], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [
    AppController,
    AddictionController,
    BusinessController,
    CasteController,
    EducationDegreeController,
    GenderController,
    GotraController,
    RaasiController,
    RelationshipController,
    ReligionController,
    ServiceController,
    FaqCategoryController,
    JobCategoryController,
    JobSubCategoryController,
    JobTypeController,
    AddressTypeController,
    CityVillageController,
    CountryController,
    DistrictController,
    StateController,
    PostController,
    MatrimonialStatusController,
    MatrimonialRequestedStatusController,
    ContactTypeController,
    JobStatusController,
    MaritalStatusController,
  ],
  providers: [
    AppService,
    AddictionService,
    BusinessService,
    CasteService,
    EducationDegreeService,
    GenderService,
    GotraService,
    RaasiService,
    RelationshipService,
    ReligionService,
    ServiceService,
    FaqCategoryService,
    JobCategoryService,
    JobSubCategoryService,
    JobTypeService,
    AddressTypeService,
    CityVillageService,
    CountryService,
    DistrictService,
    StateService,
    PostService,
    MatrimonialRequestedStatusService,
    MatrimonialStatusService,
    ContactTypeService,
    MediaSrcService,
  ],
})
export class AppModule {}
