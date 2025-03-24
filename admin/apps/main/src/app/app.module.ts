import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuardService, AuthService, CoreLibModule, HttpService } from '@vsd-frontend/core-lib';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { PagesComponent } from './pages/pages.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { BannerComponent } from './banner/banner/banner.component';
import { BannerDetailComponent } from './banner/banner-detail/banner-detail.component';
import { ManageBannerComponent } from './banner/manage-banner/manage-banner.component';
import { ManagePagesComponent } from './pages/manage-pages/manage-pages.component';
import { PagesService } from './services/pages.service';
import { BannerService } from './banner/banner.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorModule } from 'ngx-editor';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    BaseLayoutComponent,
    HeaderComponent,
    SideMenuComponent,
    ErrorComponent,
    PageNotFountComponent,
    FaqComponent,
    ManageFaqComponent,
    PagesComponent,
    ManagePagesComponent,
    InquiryComponent,
    BannerComponent,
    BannerDetailComponent,
    ManageBannerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    CoreLibModule,
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedUiLibModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    NgxEditorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSelect,
    MatOption,
  ],
  providers: [
    HttpClient,
    HttpService,
    AuthService,
    AuthGuardService,
    PagesService,
    BannerService,
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
