import { Route } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { AuthGuard } from '@vsd-frontend/core-lib';
import { ManageBannerComponent } from './banner/manage-banner/manage-banner.component';
import { BannerComponent } from './banner/banner/banner.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { FaqComponent } from './faq/faq.component';
import { ManagePagesComponent } from './pages/manage-pages/manage-pages.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { LoginComponent } from './auth/login/login.component';

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
        path: 'temple',
        loadChildren: () =>
          import('temple/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'news',
        loadChildren: () => import('news/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'matrimonial',
        loadChildren: () =>
          import('matrimonial/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'mandal',
        loadChildren: () =>
          import('mandal/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'lov',
        loadChildren: () => import('lov/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'job',
        loadChildren: () => import('job/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'family',
        loadChildren: () =>
          import('family/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'facility',
        loadChildren: () =>
          import('facility/Module').then((m) => m.RemoteEntryModule),
      },
      {
        path: 'event',
        loadChildren: () => import('event/Module').then((m) => m.RemoteEntryModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
