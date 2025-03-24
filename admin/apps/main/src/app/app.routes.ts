import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { LoginComponent } from './auth/login/login.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { AuthGuard } from '@vsd-frontend/core-lib';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { ManagePagesComponent } from './pages/manage-pages/manage-pages.component';
import { FaqComponent } from './faq/faq.component';
import { ManageFaqComponent } from './faq/manage-faq/manage-faq.component';
import { BannerComponent } from './banner/banner/banner.component';
import { ManageBannerComponent } from './banner/manage-banner/manage-banner.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
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
        path: 'facility',
        loadChildren: () =>
          loadRemote<typeof import('facility/Module')>('facility/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'temple',
        loadChildren: () => loadRemote<typeof import('temple/Module')>('temple/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'news',
        loadChildren: () => loadRemote<typeof import('news/Module')>('news/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'matrimonial',
        loadChildren: () =>
          loadRemote<typeof import('matrimonial/Module')>('matrimonial/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'mandal',
        loadChildren: () => loadRemote<typeof import('mandal/Module')>('mandal/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'lov',
        loadChildren: () => loadRemote<typeof import('lov/Module')>('lov/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'job',
        loadChildren: () => loadRemote<typeof import('job/Module')>('job/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'family',
        loadChildren: () => loadRemote<typeof import('family/Module')>('family/Module').then((m) => m!.RemoteEntryModule),
      },
      {
        path: 'event',
        loadChildren: () => loadRemote<typeof import('event/Module')>('event/Module').then((m) => m!.RemoteEntryModule),
      },
    ],
  },
];
