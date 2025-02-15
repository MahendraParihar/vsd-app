import { Route } from '@angular/router';
import { MandalListComponent } from '../mandal-list/mandal-list.component';
import { ManageMandalComponent } from '../manage-mandal/manage-mandal.component';
import { MandalDetailsComponent } from '../mandal-details/mandal-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MandalListComponent,
  },
  {
    path: 'manage',
    component: ManageMandalComponent,
  },
  {
    path: 'manage/:id',
    component: ManageMandalComponent,
  },
  {
    path: ':id',
    component: MandalDetailsComponent,
  },
];
