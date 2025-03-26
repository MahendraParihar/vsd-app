import { Route } from '@angular/router';
import { EventListComponent } from '../event-list/event-list.component';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { EventDetailsComponent } from '../event-details/event-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EventListComponent,
  },
  {
    path: 'manage',
    component: ManageEventComponent,
  },
  {
    path: 'manage/:id',
    component: ManageEventComponent,
  },
  {
    path: ':id',
    component: EventDetailsComponent,
  },
];
