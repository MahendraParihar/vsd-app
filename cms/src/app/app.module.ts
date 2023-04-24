import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DialogSendPushNotificationComponent
} from './ui/common-ui/dialog-send-push-notification/dialog-send-push-notification.component';
import {BaseLayoutComponent} from './ui/base-layout/base-layout.component';
import {MaterialModule} from "./material.module";
import {AuthGuard} from "./guard/auth-guard";
import {SideMenuComponent} from './ui/side-menu/side-menu.component';
import {HomeComponent} from './ui/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './http-request-interceptor';
import {ErrorHandlerService} from './service/error-handler.service';
import {DateFormatPipe} from './pipe/date-format.pipe';
import {DialogAlertComponent} from './ui/common-ui/dialog-alert/dialog-alert.component';
import {FaqListComponent} from "./ui/faq/faq-list/faq-list.component";
import {FaqManageComponent} from "./ui/faq/faq-manage/faq-manage.component";
import {
  ConfigParameterListComponent
} from "./ui/config-parameter/config-parameter-list/config-parameter-list.component";
import {
  ConfigParameterManageComponent
} from "./ui/config-parameter/config-parameter-manage/config-parameter-manage.component";
import {ShareModule} from "./ui/shared/share.module";
import {InfoDialogComponent} from './ui/common-ui/info-dialog/info-dialog.component';
import {PageNotFoundComponent} from "./ui/error-pages/page-not-found/page-not-found.component";
import {MatIconRegistry} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    DialogSendPushNotificationComponent,
    BaseLayoutComponent,
    SideMenuComponent,
    HomeComponent,
    DateFormatPipe,
    DialogAlertComponent,
    FaqListComponent,
    FaqManageComponent,
    ConfigParameterListComponent,
    ConfigParameterManageComponent,
    InfoDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ShareModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor, multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogAlertComponent,
    InfoDialogComponent,
  ]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon("ic_check_circle", "assets/icons/ic_check_circle.svg");
    // iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
