import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RemoteEntryComponent} from './entry.component';
import {EventListComponent} from "../event-list/event-list.component";
import {EventDetailsComponent} from "../event-details/event-details.component";
import {ManageEventComponent} from "../manage-event/manage-event.component";
import {EventLibModule} from "@vsd-frontend/event-lib";

@NgModule({
  declarations: [RemoteEntryComponent, EventListComponent, ManageEventComponent, EventDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(
    [{
      path: '',
      pathMatch: 'full',
      component: EventListComponent
    },
      {
        path: 'manage',
        component: ManageEventComponent
      },
      {
        path: 'manage/:id',
        component: ManageEventComponent
      },
      {
        path: ':id',
        component: EventDetailsComponent
      }
    ]),
    EventLibModule
  ],
  providers: [],
})
export class RemoteEntryModule {
}
