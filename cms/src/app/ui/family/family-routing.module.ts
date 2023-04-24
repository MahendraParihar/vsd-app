import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamilyListComponent} from "./family-list/family-list.component";
import {FamilyManageComponent} from "./family-manage/family-manage.component";
import {FamilyDetailComponent} from "./family-detail/family-detail.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'family-list'
  },
  {
    path: 'family-list',
    component: FamilyListComponent
  },
  {
    path: 'family-manage',
    component: FamilyManageComponent
  },
  {
    path: 'family-manage/:id',
    component: FamilyManageComponent
  },
  {
    path: 'family-detail/:id',
    component: FamilyDetailComponent
  },
  {
    path: 'edit-personal-detail/:id',
    component: FamilyManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyRoutingModule {
}
