import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCategoryComponent } from './job-category/job-category.component';
import { AdditionComponent } from './addition/addition.component';
import { AddressTypeComponent } from './address-type/address-type.component';
import { BusinessComponent } from './business/business.component';
import { CasteComponent } from './caste/caste.component';
import { CityVillageComponent } from './city-village/city-village.component';
import { ContactTypeComponent } from './contact-type/contact-type.component';
import { CountryComponent } from './country/country.component';
import { DistrictComponent } from './district/district.component';
import { FaqCategoryComponent } from './faq-category/faq-category.component';
import { GenderComponent } from './gender/gender.component';
import { GotraComponent } from './gotra/gotra.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { JobSubCategoryComponent } from './job-sub-category/job-sub-category.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { MaritalStatusComponent } from './marital-status/marital-status.component';
import { PostComponent } from './post/post.component';
import { RaasiComponent } from './raasi/raasi.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { ReligionComponent } from './religion/religion.component';
import { ServiceComponent } from './service/service.component';
import { StateComponent } from './state/state.component';
import { ManageJobCategoryComponent } from './job-category/manage-job-category/manage-job-category.component';
import { ManageAdditionComponent } from './addition/manage-addition/manage-addition.component';
import { ManageAddressTypeComponent } from './address-type/manage-address-type/manage-address-type.component';
import { ManageBusinessComponent } from './business/manage-business/manage-business.component';
import { ManageCasteComponent } from './caste/manage-caste/manage-caste.component';
import { ManageCityVillageComponent } from './city-village/manage-city-village/manage-city-village.component';
import { ManageCountryComponent } from './country/manage-country/manage-country.component';
import { ManageDistrictComponent } from './district/manage-district/manage-district.component';
import { ManageFaqCategoryComponent } from './faq-category/manage-faq-category/manage-faq-category.component';
import { ManageGenderComponent } from './gender/manage-gender/manage-gender.component';
import { ManageGotraComponent } from './gotra/manage-gotra/manage-gotra.component';
import { ManageJobStatusComponent } from './job-status/manage-job-status/manage-job-status.component';
import { ManageJobSubCategoryComponent } from './job-sub-category/manage-job-sub-category/manage-job-sub-category.component';
import { ManageJobTypeComponent } from './job-type/manage-job-type/manage-job-type.component';
import { ManageMaritalStatusComponent } from './marital-status/manage-marital-status/manage-marital-status.component';
import { ManagePostComponent } from './post/manage-post/manage-post.component';
import { ManageRaasiComponent } from './raasi/manage-raasi/manage-raasi.component';
import { ManageRelationshipComponent } from './relationship/manage-relationship/manage-relationship.component';
import { ManageReligionComponent } from './religion/manage-religion/manage-religion.component';
import { ManageServiceComponent } from './service/manage-service/manage-service.component';
import { ManageStateComponent } from './state/manage-state/manage-state.component';
import { EducationDegreeComponent } from './education-degree/education-degree.component';
import { ManageEducationDegreeComponent } from './education-degree/manage-education-degree/manage-education-degree.component';
import { ManageContactTypeComponent } from './contact-type/manage-contact-type/manage-contact-type.component';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { FormsModule } from '@angular/forms';
import { CountryService } from './country/country.service';
import { MatrimonialStatusComponent } from './martimonial-status/matrimonial-status.component';
import { ManageMatrimonialStatusComponent } from './martimonial-status/manage-matrimonial-status/manage-matrimonial-status.component';
import { MatrimonialRequestedStatusComponent } from './martimonial-requested-status/matrimonial-requested-status.component';
import { ManageMatrimonialRequestedStatusComponent } from './martimonial-requested-status/manage-matrimonial-requested-status/manage-matrimonial-requested-status.component';
import { MatCardModule } from '@angular/material/card';
import { AddictionService } from './addition/addiction.service';
import { AddressTypeService } from './address-type/address-type.service';
import { BusinessService } from './business/business.service';
import { CasteService } from './caste/caste.service';
import { CityVillageService } from './city-village/city-village.service';
import { ContactTypeService } from './contact-type/contact-type.service';
import { DistrictService } from './district/district.service';
import { EducationDegreeService } from './education-degree/education-degree.service';
import { FaqCategoryService } from './faq-category/faq-category.service';
import { GenderService } from './gender/gender.service';
import { GotraService } from './gotra/gotra.service';
import { JobCategoryService } from './job-category/job-category.service';
import { JobStatusService } from './job-status/job-status.service';
import { JobSubCategoryService } from './job-sub-category/job-sub-category.service';
import { JobTypeService } from './job-type/job-type.service';
import { MaritalStatusService } from './marital-status/marital-status.service';
import { MatrimonialRequestedStatusService } from './martimonial-requested-status/matrimonial-requested-status.service';
import { MatrimonialStatusService } from './martimonial-status/matrimonial-status.service';
import { PostService } from './post/post.service';
import { RaasiService } from './raasi/raasi.service';
import { RelationshipService } from './relationship/relationship.service';
import { ReligionService } from './religion/religion.service';
import { ServiceService } from './service/service.service';
import { StateService } from './state/state.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AdditionComponent,
    ManageAdditionComponent,
    AddressTypeComponent,
    ManageAddressTypeComponent,
    BusinessComponent,
    ManageBusinessComponent,
    CasteComponent,
    ManageCasteComponent,
    CityVillageComponent,
    ManageCityVillageComponent,
    ContactTypeComponent,
    ManageContactTypeComponent,
    CountryComponent,
    ManageCountryComponent,
    DistrictComponent,
    ManageDistrictComponent,
    EducationDegreeComponent,
    ManageEducationDegreeComponent,
    FaqCategoryComponent,
    ManageFaqCategoryComponent,
    GenderComponent,
    ManageGenderComponent,
    GotraComponent,
    ManageGotraComponent,
    JobCategoryComponent,
    ManageJobCategoryComponent,
    JobStatusComponent,
    ManageJobStatusComponent,
    JobSubCategoryComponent,
    ManageJobSubCategoryComponent,
    JobTypeComponent,
    ManageJobTypeComponent,
    MaritalStatusComponent,
    ManageMaritalStatusComponent,
    PostComponent,
    ManagePostComponent,
    RaasiComponent,
    ManageRaasiComponent,
    RelationshipComponent,
    ManageRelationshipComponent,
    ReligionComponent,
    ManageReligionComponent,
    ServiceComponent,
    ManageServiceComponent,
    StateComponent,
    ManageStateComponent,
    MatrimonialStatusComponent,
    ManageMatrimonialStatusComponent,
    MatrimonialRequestedStatusComponent,
    ManageMatrimonialRequestedStatusComponent,
  ],
  imports: [
    CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [
    AddictionService,
    AddressTypeService,
    BusinessService,
    CasteService,
    CityVillageService,
    ContactTypeService,
    CountryService,
    DistrictService,
    EducationDegreeService,
    FaqCategoryService,
    GenderService,
    GotraService,
    JobCategoryService,
    JobStatusService,
    JobSubCategoryService,
    JobTypeService,
    MaritalStatusService,
    MatrimonialRequestedStatusService,
    MatrimonialStatusService,
    PostService,
    RaasiService,
    RelationshipService,
    ReligionService,
    ServiceService,
    StateService,
  ],
  exports: [
    AdditionComponent,
    ManageAdditionComponent,
    AddressTypeComponent,
    ManageAddressTypeComponent,
    BusinessComponent,
    ManageBusinessComponent,
    CasteComponent,
    ManageCasteComponent,
    CityVillageComponent,
    ManageCityVillageComponent,
    ContactTypeComponent,
    ManageContactTypeComponent,
    CountryComponent,
    ManageCountryComponent,
    DistrictComponent,
    ManageDistrictComponent,
    EducationDegreeComponent,
    ManageEducationDegreeComponent,
    FaqCategoryComponent,
    ManageFaqCategoryComponent,
    GenderComponent,
    ManageGenderComponent,
    GotraComponent,
    ManageGotraComponent,
    JobCategoryComponent,
    ManageJobCategoryComponent,
    JobStatusComponent,
    ManageJobStatusComponent,
    JobSubCategoryComponent,
    ManageJobSubCategoryComponent,
    JobTypeComponent,
    ManageJobTypeComponent,
    MaritalStatusComponent,
    ManageMaritalStatusComponent,
    PostComponent,
    ManagePostComponent,
    RaasiComponent,
    ManageRaasiComponent,
    RelationshipComponent,
    ManageRelationshipComponent,
    ReligionComponent,
    ManageReligionComponent,
    ServiceComponent,
    ManageServiceComponent,
    StateComponent,
    ManageStateComponent,
    MatrimonialStatusComponent,
    ManageMatrimonialStatusComponent,
    MatrimonialRequestedStatusComponent,
    ManageMatrimonialRequestedStatusComponent,
  ],
})
export class LovsLibModule {}
