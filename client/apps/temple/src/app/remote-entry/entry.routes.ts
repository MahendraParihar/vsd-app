import { Route } from '@angular/router';
import { TempleListComponent } from '../temple-list/temple-list.component';
import { ManageTempleComponent } from '../manage-temple/manage-temple.component';
import { TempleDetailsComponent } from '../temple-details/temple-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: TempleListComponent,
  },
  {
    path: 'manage',
    component: ManageTempleComponent,
  },
  {
    path: 'manage/:id',
    component: ManageTempleComponent,
  },
  {
    path: ':id',
    component: TempleDetailsComponent,
  },
];
