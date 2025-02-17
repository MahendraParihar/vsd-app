import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { JobListComponent } from '../job-list/job-list.component';
import { ManageJobComponent } from '../manage-job/manage-job.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobLibModule } from '@vsd-frontend/job-lib';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    JobListComponent,
    ManageJobComponent,
    JobDetailsComponent,
  ],
  imports: [CommonModule,
    JobLibModule,
    RouterModule.forChild(
      [
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
      ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
