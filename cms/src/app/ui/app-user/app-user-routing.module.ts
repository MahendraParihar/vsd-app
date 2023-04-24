import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppUserListComponent} from "./app-user-list/app-user-list.component";
import {AppUserDeviceListComponent} from "./app-user-device-list/app-user-device-list.component";
import {AppUserLoginHistoryComponent} from "./app-user-login-history/app-user-login-history.component";
import {AppUserManageComponent} from "./app-user-manage/app-user-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: AppUserListComponent
  },
  {
    path: 'manage',
    component: AppUserManageComponent
  },
  {
    path: 'manage/:id',
    component: AppUserManageComponent
  },
  {
    path: 'app-user-device-list/:id',
    component: AppUserDeviceListComponent
  },
  {
    path: 'app-user-login-history/:id',
    component: AppUserLoginHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppUserRoutingModule {
}
