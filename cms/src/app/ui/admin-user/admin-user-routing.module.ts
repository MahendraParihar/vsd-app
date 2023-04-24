import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUserListComponent} from "./admin-user-list/admin-user-list.component";
import {AdminUserManageComponent} from "./admin-user-manage/admin-user-manage.component";
import {AdminUserChangePasswordComponent} from "./admin-user-change-password/admin-user-change-password.component";
import {AdminUserEditProfileComponent} from "./admin-user-edit-profile/admin-user-edit-profile.component";
import {AdminUserSettingComponent} from "./admin-user-setting/admin-user-setting.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: AdminUserListComponent
  },
  {
    path: 'manage',
    component: AdminUserManageComponent
  },
  {
    path: 'manage/:id',
    component: AdminUserManageComponent
  },
  {
    path: 'change-password',
    component: AdminUserChangePasswordComponent
  },
  {
    path: 'edit-profile',
    component: AdminUserEditProfileComponent
  },
  {
    path: 'setting',
    component: AdminUserSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {
}
