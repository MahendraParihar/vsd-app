import { Route } from '@angular/router';
import { LovComponent } from '../lov/lov.component';
import { ManageLovComponent } from '../manage-lov/manage-lov.component';

export const remoteRoutes: Route[] = [
  { path: ':type', component: LovComponent },
  { path: ':type/manage', component: ManageLovComponent },
  { path: ':type/manage/:id', component: ManageLovComponent },
];
