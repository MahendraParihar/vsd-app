import { DynamicModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './db-config';
import { ModelCtor } from 'sequelize-typescript';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModel } from './models/admin/permissions.model';
import {
  AddressModel,
  AddressTypeModel,
  CityVillageModel,
  CountryModel,
  DistrictModel,
  StateModel,
} from './models/location';
import { AdminRoleModel, AdminUserModel, AdminUserRoleMappingModel, UserStatusModel } from './models/admin';
import {
  AddictionModel,
  BusinessModel,
  CasteModel,
  EducationDegreeModel,
  FamilyModel,
  GotraModel,
  HealthParameterUnitModel,
  MaritalStatusModel,
  MatrimonialRequestedStatusModel,
  MatrimonialStatusModel,
  RaasiModel,
  RelationshipModel,
  ReligionModel,
  ServiceModel,
} from './models/family';
import { ContactTypeModel } from './models/contact-type.model';
import { FaqCategoryModel } from './models/faq';
import { GalleryMediaModel, GalleryModel } from './models/gallery';
import { JobCategoryModel, JobStatusModel, JobSubCategoryModel, JobTypeModel } from './models/job';
import { PostModel } from './models/mandal';
import { GenderModel } from './models/family/gender.model';
import { MediaSrcModel } from './models/media-src.model';
import { MediaTypeModel } from './models/media-type.model';
import { TableModel } from './models/table.model';
import { LogErrorModel } from './models/log-error.model';
import { FamilyProfileModel } from './models/family/family-profile.model';
import { AppConfigModel } from './models/app-config.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GlobalExceptionsFilter } from './error-handler/global-exception.filter';
import { jwtConstants } from './auth/constants';
import { LabelModel } from './models/label.model';
import { LabelDataService, LabelModule } from './label';
import { AppConfigModule } from './app-config';
import { GalleryService, MediaSrcService } from './gallery';
import { FaqCategoryService } from './faq/faq-category.service';
import { JobCategoryService, JobStatusService, JobSubCategoryService, JobTypeService } from './job';
import { GalleryMediaService } from './gallery';
import { PostService } from './family';
import { AdminUserService } from './auth/admin-user.service';
import { ContactTypeService } from './common/contact-type.service';
import { LogErrorService } from './common/log-error.service';
import { AddictionService } from './family';
import { BusinessService } from './family';
import { CasteService } from './family';
import { EducationDegreeService } from './family';
import { FamilyService } from './family';
import { FamilyProfileService } from './family';
import { GenderService } from './family';
import { GotraService } from './family';
import { HealthParameterUnitService } from './family';
import { MaritalStatusService } from './family';
import { RaasiService } from './family';
import { MatrimonialRequestedStatusService } from './family';
import { MatrimonialStatusService } from './family';
import { RelationshipService } from './family';
import { ReligionService } from './family';
import { ServiceService } from './family';
import { AddressService } from './location';
import { AddressTypeService } from './location';
import { CityVillageService } from './location';
import { CountryService } from './location';
import { DistrictService } from './location';
import { StateService } from './location';
import { MediaTypeService } from './gallery';
import { LegalPagesModel } from './models/legal-pages.model';
import { PagesService } from './common/pages.service';

const commonModels = [
  LabelModel,
  AdminUserModel,
  AdminRoleModel,
  AddictionModel,
  AdminUserRoleMappingModel,
  PermissionsModel,
  UserStatusModel,
  BusinessModel,
  CasteModel,
  EducationDegreeModel,
  FamilyModel,
  FamilyProfileModel,
  GotraModel,
  HealthParameterUnitModel,
  RaasiModel,
  RelationshipModel,
  ReligionModel,
  ServiceModel,
  FaqCategoryModel,
  GalleryModel,
  GalleryMediaModel,
  JobCategoryModel,
  JobSubCategoryModel,
  JobStatusModel,
  JobTypeModel,
  AddressModel,
  AddressTypeModel,
  CityVillageModel,
  CountryModel,
  DistrictModel,
  StateModel,
  PostModel,
  MatrimonialRequestedStatusModel,
  MatrimonialStatusModel,
  MaritalStatusModel,
  ContactTypeModel,
  GenderModel,
  MediaSrcModel,
  MediaTypeModel,
  TableModel,
  LogErrorModel,
  AppConfigModel,
  LegalPagesModel,
];

export class CommonModule {
  static forRoot(models: ModelCtor[], configModules: string[]): DynamicModule {
    const modulesNeededForCommon = ['core'];
    const modelsList = [...commonModels, ...models];
    const modulesList = [...configModules, ...modulesNeededForCommon]; // add modules needed for common
    return {
      module: CommonModule,
      controllers: [],
      providers: [
        JwtStrategy,
        AdminUserService,
        ContactTypeService,
        LogErrorService,
        AddictionService,
        BusinessService,
        CasteService,
        EducationDegreeService,
        FamilyService,
        FamilyProfileService,
        GenderService,
        GotraService,
        HealthParameterUnitService,
        MaritalStatusService,
        MatrimonialRequestedStatusService,
        MatrimonialStatusService,
        RaasiService,
        RelationshipService,
        ReligionService,
        ServiceService,
        PostService,
        JobCategoryService,
        JobSubCategoryService,
        JobStatusService,
        JobTypeService,
        GalleryService,
        GalleryMediaService,
        MediaSrcService,
        MediaTypeService,
        AddressService,
        AddressTypeService,
        CityVillageService,
        CountryService,
        DistrictService,
        StateService,
        FaqCategoryService,
        LabelDataService,
        PagesService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        {
          provide: APP_FILTER,
          useClass: GlobalExceptionsFilter,
        },
      ],
      imports: [
        SequelizeModule.forRoot({ ...databaseConfig, models: modelsList }),
        ConfigModule.forRoot(),
        LabelModule.asyncRegister(['admin']),
        AppConfigModule.asyncRegister(modulesList),
        SequelizeModule.forFeature(modelsList),
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '10h' },
        }),
      ],
      exports: [
        SequelizeModule,
        JwtModule,
        AppConfigModule,
        PassportModule,
        AdminUserService,
        ContactTypeService,
        LogErrorService,
        AddictionService,
        BusinessService,
        CasteService,
        EducationDegreeService,
        FamilyService,
        FamilyProfileService,
        GenderService,
        GotraService,
        HealthParameterUnitService,
        MaritalStatusService,
        MatrimonialRequestedStatusService,
        MatrimonialStatusService,
        RaasiService,
        RelationshipService,
        ReligionService,
        ServiceService,
        PostService,
        JobCategoryService,
        JobSubCategoryService,
        JobStatusService,
        JobTypeService,
        GalleryService,
        GalleryMediaService,
        MediaSrcService,
        MediaTypeService,
        AddressService,
        AddressTypeService,
        CityVillageService,
        CountryService,
        DistrictService,
        StateService,
        FaqCategoryService,
        LabelDataService,
        LabelModule,
        PagesService,
      ],
    };
  }
}
