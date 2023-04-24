import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MandalListComponent} from "./mandal-list/mandal-list.component";
import {MandalManageComponent} from "./mandal-manage/mandal-manage.component";
import {MandalMemberManageComponent} from "./mandal-member-manage/mandal-member-manage.component";
import {TrusteeListComponent} from "./trustee-list/trustee-list.component";
import {TrusteeManageComponent} from "./trustee-manage/trustee-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mandal-list'
  },
  {
    path: 'mandal-list',
    component: MandalListComponent
  },
  {
    path: 'mandal-manage',
    component: MandalManageComponent
  },
  {
    path: 'mandal-manage/:id',
    component: MandalManageComponent
  },
  {
    path: 'mandal-member-manage/:id',
    component: MandalMemberManageComponent
  },
  {
    path: 'trustee-list',
    component: TrusteeListComponent
  },
  {
    path: 'trustee-manage',
    component: TrusteeManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MandalRoutingModule {
}
