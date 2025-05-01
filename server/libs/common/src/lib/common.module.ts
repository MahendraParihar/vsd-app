import { DynamicModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './db-config';
import { ModelCtor } from 'sequelize-typescript';
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
import { LabelModel } from './models/label.model';
import { LabelDataService, LabelModule } from './label';
import { AppConfigModule } from './app-config';
import { GalleryMediaService, GalleryService, MediaSrcService, MediaTypeService } from './gallery';
import { FaqCategoryService } from './faq/faq-category.service';
import { JobCategoryService, JobStatusService, JobSubCategoryService, JobTypeService } from './job';
import {
  AddictionService,
  BusinessService,
  CasteService,
  EducationDegreeService,
  FamilyProfileService,
  FamilyService,
  GenderService,
  GotraService,
  HealthParameterUnitService,
  MaritalStatusService,
  MatrimonialRequestedStatusService,
  MatrimonialStatusService,
  PostService,
  RaasiService,
  RelationshipService,
  ReligionService,
  ServiceService,
} from './family';
import { AdminUserService } from './auth/admin-user.service';
import { ContactTypeService } from './common/contact-type.service';
import { LogErrorService } from './common/log-error.service';
import {
  AddressService,
  AddressTypeService,
  CityVillageService,
  CountryService,
  DistrictService,
  StateService,
} from './location';
import { LegalPagesModel } from './models/legal-pages.model';
import { PagesService } from './common/pages.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { Env } from './utils/env.values';
import { ExternalStrategy } from './auth/external.strategy';

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
    const jwtModuleConfig = {
      useFactory: () => ({
        secret: Env.jwtSecret,
        signOptions: { expiresIn: Env.accessTokenTime },
      }),
    };
    return {
      module: CommonModule,
      controllers: [
        HealthController,
      ],
      imports: [
        SequelizeModule.forRoot({ ...databaseConfig, models: modelsList }),
        ConfigModule.forRoot({ isGlobal: true }),
        LabelModule.asyncRegister(['admin']),
        AppConfigModule.asyncRegister(modulesList),
        SequelizeModule.forFeature(modelsList),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync(jwtModuleConfig),
        TerminusModule,
      ],
      providers: [
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
          provide: APP_GUARD,
          useClass: ExternalStrategy,
        },
        {
          provide: APP_FILTER,
          useClass: GlobalExceptionsFilter,
        },
        JwtStrategy,
        ExternalStrategy
      ],
      exports: [
        SequelizeModule,
        JwtModule,
        PassportModule,
        AppConfigModule,
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
