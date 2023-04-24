import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from "./event-list/event-list.component";
import {EventManageComponent} from "./event-manage/event-manage.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'event-list'
  },
  {
    path: 'event-list',
    component: EventListComponent
  },
  {
    path: 'event-manage',
    component: EventManageComponent
  },
  {
    path: 'event-manage/:id',
    component: EventManageComponent
  },
  {
    path: 'event-detail/:id',
    component: EventDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
