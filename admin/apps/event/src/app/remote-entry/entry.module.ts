import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { EventListComponent } from '../event-list/event-list.component';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventLibModule } from '@vsd-frontend/event-lib';

@NgModule({
  declarations: [RemoteEntryComponent, EventListComponent, ManageEventComponent, EventDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), EventLibModule],
  providers: [],
})
export class RemoteEntryModule {}
