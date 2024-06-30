import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobComponent } from './job/job.component';
import { ManageJobComponent } from './manage-job/manage-job.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JobDetailComponent, JobComponent, ManageJobComponent],
  exports: [JobDetailComponent, JobComponent, ManageJobComponent],
})
export class JobLibModule {}
