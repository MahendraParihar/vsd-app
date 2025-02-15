import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { EventListComponent } from '../event-list/event-list.component';
import { EventLibModule } from '@vsd-frontend/event-lib';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { ManageEventComponent } from '../manage-event/manage-event.component';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    EventListComponent,
    ManageEventComponent,
    EventDetailsComponent,
  ],
  imports: [CommonModule, EventLibModule, RouterModule.forChild(remoteRoutes)],
  providers: [],
})
export class RemoteEntryModule {}
