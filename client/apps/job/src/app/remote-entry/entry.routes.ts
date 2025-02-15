import { Route } from '@angular/router';
import { JobListComponent } from '../job-list/job-list.component';
import { ManageJobComponent } from '../manage-job/manage-job.component';
import { JobDetailsComponent } from '../job-details/job-details.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: JobListComponent,
  },
  {
    path: 'manage',
    component: ManageJobComponent,
  },
  {
    path: 'manage/:id',
    component: ManageJobComponent,
  },
  {
    path: ':id',
    component: JobDetailsComponent,
  },
];
