import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { JobListComponent } from '../job-list/job-list.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { ManageJobComponent } from '../manage-job/manage-job.component';
import { JobLibModule } from '@vsd-frontend/job-lib';

@NgModule({
  declarations: [RemoteEntryComponent, JobListComponent, ManageJobComponent, JobDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), JobLibModule],
  providers: [],
})
export class RemoteEntryModule {}
