import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {JobComponent} from './job/job.component';
import {ManageJobComponent} from './manage-job/manage-job.component';
import {JobService} from "./job.service";
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,],
  declarations: [JobDetailComponent, JobComponent, ManageJobComponent],
  exports: [JobDetailComponent, JobComponent, ManageJobComponent],
  providers: [JobService]
})
export class JobLibModule {
}
