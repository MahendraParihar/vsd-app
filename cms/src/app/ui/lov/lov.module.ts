import {NgModule} from '@angular/core';

import {LovRoutingModule} from './lov-routing.module';
import {BusinessListComponent} from './business/business-list/business-list.component';
import {BusinessManageComponent} from './business/business-manage/business-manage.component';
import {ServiceListComponent} from './services/service-list/service-list.component';
import {ServiceManageComponent} from './services/service-manage/service-manage.component';
import {CountryListComponent} from './address/country-list/country-list.component';
import {CountryManageComponent} from './address/country-manage/country-manage.component';
import {StateListComponent} from './address/state-list/state-list.component';
import {StateManageComponent} from './address/state-manage/state-manage.component';
import {DistrictListComponent} from './address/district-list/district-list.component';
import {DistrictManageComponent} from './address/district-manage/district-manage.component';
import {GenderListComponent} from './gender-list/gender-list.component';
import {GenderManageComponent} from './gender-manage/gender-manage.component';
import {AddictionListComponent} from './addication/addiction-list/addiction-list.component';
import {AddictionManageComponent} from './addication/addiction-manage/addiction-manage.component';
import {RelationshipListComponent} from './relationship-list/relationship-list.component';
import {RelationshipManageComponent} from './relationship-manage/relationship-manage.component';
import {ReligionListComponent} from './religion-list/religion-list.component';
import {ReligionManageComponent} from './religion-manage/religion-manage.component';
import {GotraListComponent} from './gotra/gotra-list/gotra-list.component';
import {GotraManageComponent} from './gotra/gotra-manage/gotra-manage.component';
import {JobTypeListComponent} from './job/job-type-list/job-type-list.component';
import {JobTypeManageComponent} from './job/job-type-manage/job-type-manage.component';
import {JobCategoryListComponent} from './job/job-category-list/job-category-list.component';
import {JobCategoryManageComponent} from './job/job-category-manage/job-category-manage.component';
import {JobSubCategoryListComponent} from './job/job-sub-category-list/job-sub-category-list.component';
import {JobSubCategoryManageComponent} from './job/job-sub-category-manage/job-sub-category-manage.component';
import {FaqCategoryListComponent} from './faq/faq-category-list/faq-category-list.component';
import {FaqCategoryManageComponent} from './faq/faq-category-manage/faq-category-manage.component';
import {CityVillageListComponent} from './address/city-village-list/city-village-list.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostManageComponent} from './post-manage/post-manage.component';
import {CityVillageManageComponent} from './address/city-village-manage/city-village-manage.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";
import { EducationListComponent } from './education/education-list/education-list.component';
import { EducationManageComponent } from './education/education-manage/education-manage.component';


@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessManageComponent,
    ServiceListComponent,
    ServiceManageComponent,
    CountryListComponent,
    CountryManageComponent,
    StateListComponent,
    StateManageComponent,
    DistrictListComponent,
    DistrictManageComponent,
    GenderListComponent,
    GenderManageComponent,
    AddictionListComponent,
    AddictionManageComponent,
    RelationshipListComponent,
    RelationshipManageComponent,
    ReligionListComponent,
    ReligionManageComponent,
    GotraListComponent,
    GotraManageComponent,
    JobTypeListComponent,
    JobTypeManageComponent,
    JobCategoryListComponent,
    JobCategoryManageComponent,
    JobSubCategoryListComponent,
    JobSubCategoryManageComponent,
    FaqCategoryListComponent,
    FaqCategoryManageComponent,
    CityVillageListComponent,
    PostListComponent,
    PostManageComponent,
    CityVillageManageComponent,
    EducationListComponent,
    EducationManageComponent
  ],
  imports: [
    ShareModule,
    LovRoutingModule,
    MaterialModule
  ]
})
export class LovModule {
}
