import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService, CoreLibModule, HttpService } from '@vsd-frontend/core-lib';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorModule } from 'ngx-editor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './auth/auth.service';
import { PagesService } from './services/pages.service';
import { BannerService } from './banner/banner.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ErrorComponent } from './error/error.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { FaqComponent } from './faq/faq.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { PagesComponent } from './pages/pages.component';
import { ManagePagesComponent } from './pages/manage-pages/manage-pages.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { BannerComponent } from './banner/banner/banner.component';
import { BannerDetailComponent } from './banner/banner-detail/banner-detail.component';
import { ManageBannerComponent } from './banner/manage-banner/manage-banner.component';

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
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpService,
    AuthService,
    AuthGuardService,
    PagesService,
    BannerService,
    provideMomentDateAdapter(MY_FORMATS),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
