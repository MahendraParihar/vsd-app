import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { CoreLibModule, PageTitleStrategy } from '@vsd-frontend/core-lib';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { TempleListComponent } from './temple/list/temple-list.component';
import { MangeTempleComponent } from './temple/manage/mange-temple.component';
import { MandalListComponent } from './mandal/list/mandal-list.component';
import { MangeMandalComponent } from './mandal/manage/mange-mandal.component';
import { EventListComponent } from './event/list/event-list.component';
import { MangeEventComponent } from './event/manage/mange-event.component';
import { NewsListComponent } from './news/list/news-list.component';
import { MangeNewsComponent } from './news/manage/mange-news.component';
import { FamilyListComponent } from './family/list/family-list.component';
import { FamilyMangeComponent } from './family/manage/family-mange.component';
import { FacilityListComponent } from './facility/list/facility-list.component';
import { MangeFacilityComponent } from './facility/manage/mange-facility.component';
import { BannerListComponent } from './banner/list/banner-list.component';
import { MangeBannerComponent } from './banner/manage/mange-banner.component';
import { JobListComponent } from './job/list/job-list.component';
import { MangeJobComponent } from './job/manage/mange-job.component';
import { MatrimonialListComponent } from './matrimonial/list/matrimonial-list.component';
import { MangeMatrimonialComponent } from './matrimonial/manage/mange-matrimonial.component';
import { PagesListComponent } from './pages/list/pages-list.component';
import { MangePagesComponent } from './pages/manage/mange-pages.component';
import { FaqListComponent } from './faq/list/faq-list.component';
import { MangeFaqComponent } from './faq/manage/mange-faq.component';
import { InquiryListComponent } from './inquiry/list/inquiry-list.component';
import { EventLibModule } from '@vsd-frontend/event-lib';
import { TempleLibModule } from '@vsd-frontend/temple-lib';
import { NewsLibModule } from '@vsd-frontend/news-lib';
import { FamilyLibModule } from '@vsd-frontend/family-lib';
import { FacilityLibModule } from '@vsd-frontend/facility-lib';
import { JobLibModule } from '@vsd-frontend/job-lib';
import { LovsLibModule } from '@vsd-frontend/lovs-lib';
import { MatrimonialLibModule } from '@vsd-frontend/matrimonial-lib';
import { MandalLibModule } from '@vsd-frontend/mandal-lib';
import { FamilyDetailsComponent } from './family/details/family-details.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LovListComponent } from './lov/list/lov-list.component';
import { MangeLovComponent } from './lov/manage/mange-lov.component';
import { MatCell, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { InquiryService } from './inquiry/list/inquiry.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AdminLibModule } from '@vsd-frontend/admin-lib';
import { BannerLibModule } from '@vsd-frontend/banner-lib';
import { PageLibModule } from '@vsd-frontend/page-lib';
import { FaqLibModule } from '@vsd-frontend/faq-lib';
import { AdminListComponent } from './auth/list/admin-list.component';
import { ManageAdminComponent } from './auth/manage/manage-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BaseLayoutComponent,
    TempleListComponent,
    MangeTempleComponent,
    TempleListComponent,
    MandalListComponent,
    MangeMandalComponent,
    EventListComponent,
    MangeEventComponent,
    NewsListComponent,
    MangeNewsComponent,
    FamilyListComponent,
    FamilyMangeComponent,
    FacilityListComponent,
    MangeFacilityComponent,
    BannerListComponent,
    MangeBannerComponent,
    JobListComponent,
    MangeJobComponent,
    MatrimonialListComponent,
    MangeMatrimonialComponent,
    PagesListComponent,
    MangePagesComponent,
    FaqListComponent,
    MangeFaqComponent,
    InquiryListComponent,
    FamilyDetailsComponent,
    LovListComponent,
    MangeLovComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    AdminListComponent,
    ManageAdminComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { bindToComponentInputs: true }),
    SharedUiLibModule,
    MatSidenavModule,
    MatListModule,
    EventLibModule,
    TempleLibModule,
    JobLibModule,
    NewsLibModule,
    FamilyLibModule,
    FacilityLibModule,
    LovsLibModule,
    MatrimonialLibModule,
    MandalLibModule,
    BannerLibModule,
    PageLibModule,
    FaqLibModule,
    CoreLibModule,
    AdminLibModule,
    MatCell,
    MatPaginatorModule,
    MatTableModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSlideToggle,
  ],
  providers: [
    InquiryService,
    provideRouter(appRoutes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideMomentDateAdapter(MY_FORMATS),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
