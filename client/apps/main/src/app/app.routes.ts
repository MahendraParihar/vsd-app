import { Route } from '@angular/router';
import { AuthGuard } from '@vsd-frontend/core-lib';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { PagesComponent } from './pages/pages.component';
import { ManagePagesComponent } from './pages/manage-pages/manage-pages.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { FaqComponent } from './faq/faq.component';
import { BannerComponent } from './banner/banner/banner.component';
import { ManageBannerComponent } from './banner/manage-banner/manage-banner.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
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
        path: 'page',
        canActivate: [AuthGuard],
        component: PagesComponent,
      },
      {
        path: 'inquiry',
        canActivate: [AuthGuard],
        component: InquiryComponent,
      },
      {
        path: 'page/manage',
        canActivate: [AuthGuard],
        component: ManagePagesComponent,
      },
      {
        path: 'page/manage/:id',
        canActivate: [AuthGuard],
        component: ManagePagesComponent,
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
      {
        path: 'banner',
        component: BannerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banner/manage',
        component: ManageBannerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banner/manage/:id',
        component: ManageBannerComponent,
        canActivate: [AuthGuard],
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
        path: 'facility',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('facility/Module').then((m) => m.RemoteEntryModule),
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
];
