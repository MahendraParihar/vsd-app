import {Module} from '@nestjs/common';
import {AddictionController} from "./controller/addiction.controller";
import {GotraController} from './controller/gotra.controller';
import {GenderController} from './controller/gender.controller';
import {RelationShipController} from './controller/relation-ship.controller';
import {ReligionController} from './controller/religion.controller';
import {PostController} from './controller/post.controller';
import {ServiceController} from './controller/service.controller';
import {BusinessController} from './controller/business.controller';
import {JobTypeController} from './controller/job-type.controller';
import {JobCategoryController} from './controller/job-category.controller';
import {JobSubCategoryController} from './controller/job-sub-category.controller';
import {FaqCategoryController} from './controller/faq-category.controller';
import {CountryController} from './controller/country.controller';
import {StateController} from './controller/state.controller';
import {DistrictController} from './controller/district.controller';
import {CityVillageController} from './controller/city-village.controller';
import {lovProvider} from "./lov.providers";
import {LovService} from "./lov.service";

@Module({
  controllers: [
    AddictionController, GotraController, GenderController,
    RelationShipController, ReligionController, PostController, ServiceController, BusinessController,
    JobTypeController, JobCategoryController, JobSubCategoryController, FaqCategoryController, CountryController,
    StateController, DistrictController, CityVillageController
  ],
  providers: [
    LovService,
    ...lovProvider
  ]
})
export class LovModule {
}
