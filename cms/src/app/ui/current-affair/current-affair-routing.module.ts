import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrentAffairListComponent} from "./current-affair-list/current-affair-list.component";
import {CurrentAffairManageComponent} from "./current-affair-manage/current-affair-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'current-affair-list'
  },
  {
    path: 'current-affair-list',
    component: CurrentAffairListComponent
  },
  {
    path: 'current-affair-manage',
    component: CurrentAffairManageComponent
  },
  {
    path: 'current-affair-manage/:id',
    component: CurrentAffairManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentAffairRoutingModule {
}
