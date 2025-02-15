import { Route } from '@angular/router';
import { FacilityListComponent } from '../facility-list/facility-list.component';
import { ManageFacilityComponent } from '@vsd-frontend/faclity-lib';
import { FacilityDetailsComponent } from '../facility-details/facility-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: FacilityListComponent,
  },
  {
    path: 'manage',
    component: ManageFacilityComponent,
  },
  {
    path: 'manage/:id',
    component: ManageFacilityComponent,
  },
  {
    path: ':id',
    component: FacilityDetailsComponent,
  },
];
