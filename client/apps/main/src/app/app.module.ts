import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {
  AuthGuard,
  AuthGuardService,
  CoreLibModule,
  HttpService,
} from '@vsd-frontend/core-lib';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth/auth.service';
import { FaqComponent } from './faq/faq.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: BaseLayoutComponent,
          //canActivateChild: [ChildAuthGuard],
          children: [
            {
              path: '',
              redirectTo: 'home',
              pathMatch: 'full',
            },
            {
              path: 'home',
              canActivate: [AuthGuard],
              component: HomeComponent,
            },
            {
              path: 'event',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('event/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'family',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('family/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'news',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('news/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'mandal',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('mandal/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'temple',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('temple/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'matrimonial',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('matrimonial/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'lov',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('lov/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'job',
              canActivate: [AuthGuard],
              loadChildren: () =>
                import('job/Module').then((m) => m.RemoteEntryModule),
            },
            {
              path: 'faq',
              component: FaqComponent,
              canActivate: [AuthGuard],
            },
            {
              path: 'faq/manage',
              component: ManageFaqComponent,
              canActivate: [AuthGuard],
            },
            {
              path: 'faq/manage/:id',
              component: ManageFaqComponent,
              canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordComponent,
        },
        {
          path: 'reset-password',
          component: ResetPasswordComponent,
        },
        {
          path: '**',
          pathMatch: 'full',
          component: PageNotFountComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
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
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService, AuthService, AuthGuardService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    // this.matIconRegistry.addSvgIcon("ic_check_circle", "assets/icons/ic_check_circle.svg");
    // iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
