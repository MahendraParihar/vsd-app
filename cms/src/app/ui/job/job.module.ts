import {NgModule} from '@angular/core';

import {JobRoutingModule} from './job-routing.module';
import {JobListComponent} from './job-list/job-list.component';
import {JobManageComponent} from './job-manage/job-manage.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";


@NgModule({
  declarations: [
    JobListComponent,
    JobManageComponent
  ],
  imports: [
    ShareModule,
    JobRoutingModule,
    MaterialModule
  ]
})
export class JobModule {
}
