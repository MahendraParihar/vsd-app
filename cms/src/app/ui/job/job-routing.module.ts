import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobListComponent} from "./job-list/job-list.component";
import {JobManageComponent} from "./job-manage/job-manage.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'job-list'
  },
  {
    path: 'job-list',
    component: JobListComponent
  },
  {
    path: 'job-manage',
    component: JobManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule {
}
