import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PushNotificationReportComponent} from "./push-notification-report/push-notification-report.component";
import {InquiryReportComponent} from "./inquiry-report/inquiry-report.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inquiry-report'
  },
  {
    path: 'inquiry-report',
    component: InquiryReportComponent
  },
  {
    path: 'push-notification-report',
    component: PushNotificationReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
