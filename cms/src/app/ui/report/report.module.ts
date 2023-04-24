import {NgModule} from '@angular/core';

import {ReportRoutingModule} from './report-routing.module';
import {InquiryReportComponent} from './inquiry-report/inquiry-report.component';
import {DialogInquiryDetailComponent} from './dialog-inquiry-detail/dialog-inquiry-detail.component';
import {PushNotificationReportComponent} from './push-notification-report/push-notification-report.component';
import {DialogPushNotificationDetailComponent} from './dialog-push-notification-detail/dialog-push-notification-detail.component';


@NgModule({
  declarations: [
    InquiryReportComponent,
    DialogInquiryDetailComponent,
    PushNotificationReportComponent,
    DialogPushNotificationDetailComponent
  ],
  imports: [
    ReportRoutingModule
  ]
})
export class ReportModule {
}
