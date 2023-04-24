import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddictionListComponent} from "./addication/addiction-list/addiction-list.component";
import {AddictionManageComponent} from "./addication/addiction-manage/addiction-manage.component";
import {BusinessListComponent} from "./business/business-list/business-list.component";
import {BusinessManageComponent} from "./business/business-manage/business-manage.component";
import {ServiceListComponent} from "./services/service-list/service-list.component";
import {ServiceManageComponent} from "./services/service-manage/service-manage.component";
import {CityVillageListComponent} from "./address/city-village-list/city-village-list.component";
import {CountryListComponent} from "./address/country-list/country-list.component";
import {CountryManageComponent} from "./address/country-manage/country-manage.component";
import {DistrictListComponent} from "./address/district-list/district-list.component";
import {DistrictManageComponent} from "./address/district-manage/district-manage.component";
import {StateListComponent} from "./address/state-list/state-list.component";
import {StateManageComponent} from "./address/state-manage/state-manage.component";
import {FaqCategoryListComponent} from "./faq/faq-category-list/faq-category-list.component";
import {FaqCategoryManageComponent} from "./faq/faq-category-manage/faq-category-manage.component";
import {GenderListComponent} from "./gender-list/gender-list.component";
import {GenderManageComponent} from "./gender-manage/gender-manage.component";
import {GotraListComponent} from "./gotra/gotra-list/gotra-list.component";
import {GotraManageComponent} from "./gotra/gotra-manage/gotra-manage.component";
import {JobCategoryListComponent} from "./job/job-category-list/job-category-list.component";
import {JobCategoryManageComponent} from "./job/job-category-manage/job-category-manage.component";
import {JobTypeListComponent} from "./job/job-type-list/job-type-list.component";
import {JobTypeManageComponent} from "./job/job-type-manage/job-type-manage.component";
import {JobSubCategoryListComponent} from "./job/job-sub-category-list/job-sub-category-list.component";
import {JobSubCategoryManageComponent} from "./job/job-sub-category-manage/job-sub-category-manage.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostManageComponent} from "./post-manage/post-manage.component";
import {RelationshipListComponent} from "./relationship-list/relationship-list.component";
import {RelationshipManageComponent} from "./relationship-manage/relationship-manage.component";
import {ReligionListComponent} from "./religion-list/religion-list.component";
import {ReligionManageComponent} from "./religion-manage/religion-manage.component";
import {CityVillageManageComponent} from "./address/city-village-manage/city-village-manage.component";
import {EducationListComponent} from "./education/education-list/education-list.component";
import {EducationManageComponent} from "./education/education-manage/education-manage.component";

const routes: Routes = [
  {
    path: 'addiction-list',
    component: AddictionListComponent
  },
  {
    path: 'addiction-manage',
    component: AddictionManageComponent
  },
  {
    path: 'business-list',
    component: BusinessListComponent
  },
  {
    path: 'business-manage',
    component: BusinessManageComponent
  },
  {
    path: 'service-list',
    component: ServiceListComponent
  },
  {
    path: 'service-manage',
    component: ServiceManageComponent
  },
  {
    path: 'address-list',
    component: CityVillageListComponent
  },
  {
    path: 'address-manage',
    component: CityVillageManageComponent
  },
  {
    path: 'country-list',
    component: CountryListComponent
  },
  {
    path: 'country-manage',
    component: CountryManageComponent
  },
  {
    path: 'district-list',
    component: DistrictListComponent
  },
  {
    path: 'district-manage',
    component: DistrictManageComponent
  },
  {
    path: 'state-list',
    component: StateListComponent
  },
  {
    path: 'state-manage',
    component: StateManageComponent
  },
  {
    path: 'faq-category-list',
    component: FaqCategoryListComponent
  },
  {
    path: 'faq-category-manage',
    component: FaqCategoryManageComponent
  },
  {
    path: 'gender-list',
    component: GenderListComponent
  },
  {
    path: 'gender-manage',
    component: GenderManageComponent
  },
  {
    path: 'gotra-list',
    component: GotraListComponent
  },
  {
    path: 'gotra-manage',
    component: GotraManageComponent
  },
  {
    path: 'job-category-list',
    component: JobCategoryListComponent
  },
  {
    path: 'job-category-manage',
    component: JobCategoryManageComponent
  },
  {
    path: 'job-type-list',
    component: JobTypeListComponent
  },
  {
    path: 'job-type-manage',
    component: JobTypeManageComponent
  },
  {
    path: 'job-sub-category-list',
    component: JobSubCategoryListComponent
  },
  {
    path: 'job-sub-category-manage',
    component: JobSubCategoryManageComponent
  },
  {
    path: 'post-list',
    component: PostListComponent
  },
  {
    path: 'post-manage',
    component: PostManageComponent
  },
  {
    path: 'relationship-list',
    component: RelationshipListComponent
  },
  {
    path: 'relationship-manage',
    component: RelationshipManageComponent
  },
  {
    path: 'religion-list',
    component: ReligionListComponent
  },
  {
    path: 'religion-manage',
    component: ReligionManageComponent
  },
  {
    path: 'education-list',
    component: EducationListComponent
  },
  {
    path: 'education-manage',
    component: EducationManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LovRoutingModule {
}
