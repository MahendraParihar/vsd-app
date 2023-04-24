import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TempleListComponent} from "./temple-list/temple-list.component";
import {TempleManageComponent} from "./temple-manage/temple-manage.component";
import {EventManageComponent} from "../event/event-manage/event-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'temple-list'
  },
  {
    path: 'temple-list',
    component: TempleListComponent
  },
  {
    path: 'temple-manage',
    component: TempleManageComponent
  },
  {
    path: 'temple-manage/:id',
    component: TempleManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TempleRoutingModule {
}
