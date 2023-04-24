import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatrimonialListComponent} from "./matrimonial-list/matrimonial-list.component";
import {MatrimonialManageComponent} from "./matrimonial-manage/matrimonial-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'matrimonial-list'
  },
  {
    path: 'matrimonial-list',
    component: MatrimonialListComponent
  },
  {
    path: 'matrimonial-manage',
    component: MatrimonialManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatrimonialRoutingModule {
}
