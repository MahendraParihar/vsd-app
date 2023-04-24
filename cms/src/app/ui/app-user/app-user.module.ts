import {NgModule} from '@angular/core';

import {AppUserRoutingModule} from './app-user-routing.module';
import {AppUserListComponent} from './app-user-list/app-user-list.component';
import {AppUserManageComponent} from './app-user-manage/app-user-manage.component';
import {AppUserDeviceListComponent} from './app-user-device-list/app-user-device-list.component';
import {DialogAppUserDeviceDetailComponent} from './dialog-app-user-device-detail/dialog-app-user-device-detail.component';
import {AppUserLoginHistoryComponent} from './app-user-login-history/app-user-login-history.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";


@NgModule({
  declarations: [
    AppUserListComponent,
    AppUserManageComponent,
    AppUserDeviceListComponent,
    DialogAppUserDeviceDetailComponent,
    AppUserLoginHistoryComponent
  ],
  imports: [
    ShareModule,
    AppUserRoutingModule,
    MaterialModule
  ]
})
export class AppUserModule {
}
