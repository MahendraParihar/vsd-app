import { Route } from '@angular/router';
import { FamilyListComponent } from '../family-list/family-list.component';
import { ManageFamilyComponent } from '../manage-family/manage-family.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: FamilyListComponent,
  },
  {
    path: 'manage',
    component: ManageFamilyComponent,
  },
  {
    path: 'manage/:id',
    component: ManageFamilyComponent,
  },
  {
    path: ':id',
    component: FamilyDetailsComponent,
  },
];
