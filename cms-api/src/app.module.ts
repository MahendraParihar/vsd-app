import {Module} from '@nestjs/common';
import {DatabaseModule} from './core/database/database.module';
import {ConfigModule} from '@nestjs/config';
import {ModelList} from './core/database/db.model-list';
import {SequelizeModule} from '@nestjs/sequelize';
import {AccountModule} from './modules/account/account.module';
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter} from './http-exception.filter';
import {EventsModule} from './modules/events/events.module';
import {CommonModule} from './modules/common/common.module';
import {CurrentAffairModule} from './modules/current-affair/current-affair.module';
import {FamilyModule} from './modules/family/family.module';
import {JobsModule} from './modules/jobs/jobs.module';
import {MiscModule} from './modules/misc/misc.module';
import {AdminUserModule} from './modules/admin-user/admin-user.module';
import {LovModule} from './modules/lov/lov.module';
import {MandalModule} from './modules/mandal/mandal.module';
import {TempleModule} from './modules/temple/temple.module';
import {AppUserModule} from './modules/app-user/app-user.module';
import {MatrimonialModule} from './modules/matrimonial/matrimonial.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forFeature(ModelList),
    DatabaseModule,
    AccountModule,
    EventsModule,
    CurrentAffairModule,
    CommonModule,
    FamilyModule,
    JobsModule,
    MiscModule,
    AdminUserModule,
    LovModule,
    MandalModule,
    TempleModule,
    AppUserModule,
    MatrimonialModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../media-files'), // added ../ to get one folder back
      serveRoot: '/media-files/' //last slash was important
    }),
  ],
  controllers: AppModule.getControllers(),
  providers: AppModule.getProviders(),
})
export class AppModule {

  /**
   * Keep Adding Controller List here
   * @returns Array
   */
  static getControllers(): any[] {
    return []
  }

  /**
   * Keep Adding Future Providers / Services here
   * @returns Array
   */
  static getProviders(): any[] {
    return [
      {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      }
    ]
  }
}
