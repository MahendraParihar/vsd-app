import { Route } from '@angular/router';
import { MatrimonialListComponent } from '../matrimonial-list/matrimonial-list.component';
import { ManageMatrimonialComponent } from '../manage-matrimonial/manage-matrimonial.component';
import { MatrimonialDetailsComponent } from '../matrimonial-details/matrimonial-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MatrimonialListComponent,
  },
  {
    path: 'manage',
    component: ManageMatrimonialComponent,
  },
  {
    path: 'manage/:id',
    component: ManageMatrimonialComponent,
  },
  {
    path: ':id',
    component: MatrimonialDetailsComponent,
  },
];
