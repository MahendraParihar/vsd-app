import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { TempleListComponent } from './temple/list/temple-list.component';
import { MangeTempleComponent } from './temple/manage/mange-temple.component';
import { BannerListComponent } from './banner/list/banner-list.component';
import { MangeBannerComponent } from './banner/manage/mange-banner.component';
import { EventListComponent } from './event/list/event-list.component';
import { MangeEventComponent } from './event/manage/mange-event.component';
import { NewsListComponent } from './news/list/news-list.component';
import { MangeNewsComponent } from './news/manage/mange-news.component';
import { FamilyListComponent } from './family/list/family-list.component';
import { FamilyMangeComponent } from './family/manage/family-mange.component';
import { FacilityListComponent } from './facility/list/facility-list.component';
import { MangeFacilityComponent } from './facility/manage/mange-facility.component';
import { JobListComponent } from './job/list/job-list.component';
import { MangeJobComponent } from './job/manage/mange-job.component';
import { FaqListComponent } from './faq/list/faq-list.component';
import { MangeFaqComponent } from './faq/manage/mange-faq.component';
import { PagesListComponent } from './pages/list/pages-list.component';
import { MangePagesComponent } from './pages/manage/mange-pages.component';
import { MandalListComponent } from './mandal/list/mandal-list.component';
import { MangeMandalComponent } from './mandal/manage/mange-mandal.component';
import { MatrimonialListComponent } from './matrimonial/list/matrimonial-list.component';
import { MangeMatrimonialComponent } from './matrimonial/manage/mange-matrimonial.component';
import { InquiryListComponent } from './inquiry/list/inquiry-list.component';
import { LovListComponent } from './lov/list/lov-list.component';
import { MangeLovComponent } from './lov/manage/mange-lov.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from '@vsd-frontend/core-lib';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AdminListComponent, ManageAdminComponent } from '@vsd-frontend/admin-lib';

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
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'admin-user',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: AdminListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manage',
            component: ManageAdminComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manage/:id',
            component: ManageAdminComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banner',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: BannerListComponent,
          },
          {
            path: 'manage',
            component: MangeBannerComponent,
          },
          {
            path: 'manage/:id',
            component: MangeBannerComponent,
          },
        ],
      },
      {
        path: 'temple',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: TempleListComponent,
          },
          {
            path: 'manage',
            component: MangeTempleComponent,
          },
          {
            path: 'manage/:id',
            component: MangeTempleComponent,
          },
        ],
      },
      {
        path: 'event',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: EventListComponent,
          },
          {
            path: 'manage',
            component: MangeEventComponent,
          },
          {
            path: 'manage/:id',
            component: MangeEventComponent,
          },
        ],
      },
      {
        path: 'news',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: NewsListComponent,
          },
          {
            path: 'manage',
            component: MangeNewsComponent,
          },
          {
            path: 'manage/:id',
            component: MangeNewsComponent,
          },
        ],
      },
      {
        path: 'family',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: FamilyListComponent,
          },
          {
            path: 'manage',
            component: FamilyMangeComponent,
          },
          {
            path: 'manage/:id',
            component: FamilyMangeComponent,
          },
        ],
      },
      {
        path: 'facility',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: FacilityListComponent,
          },
          {
            path: 'manage',
            component: MangeFacilityComponent,
          },
          {
            path: 'manage/:id',
            component: MangeFacilityComponent,
          },
        ],
      },
      {
        path: 'job',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: JobListComponent,
          },
          {
            path: 'manage',
            component: MangeJobComponent,
          },
          {
            path: 'manage/:id',
            component: MangeJobComponent,
          },
        ],
      },
      {
        path: 'faq',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: FaqListComponent,
          },
          {
            path: 'manage',
            component: MangeFaqComponent,
          },
          {
            path: 'manage/:id',
            component: MangeFaqComponent,
          },
        ],
      },
      {
        path: 'page',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PagesListComponent,
          },
          {
            path: 'manage',
            component: MangePagesComponent,
          },
          {
            path: 'manage/:id',
            component: MangePagesComponent,
          },
        ],
      },
      {
        path: 'mandal',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: MandalListComponent,
          },
          {
            path: 'manage',
            component: MangeMandalComponent,
          },
          {
            path: 'manage/:id',
            component: MangeMandalComponent,
          },
        ],
      },
      {
        path: 'matrimonial',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: MatrimonialListComponent,
          },
          {
            path: 'manage',
            component: MangeMatrimonialComponent,
          },
          {
            path: 'manage/:id',
            component: MangeMatrimonialComponent,
          },
        ],
      },
      {
        path: 'lov',
        canActivate: [AuthGuard],
        children: [
          {
            path: ':type',
            component: LovListComponent,
          },
          {
            path: 'manage/:type',
            component: MangeLovComponent,
          },
          {
            path: 'manage/:type/:id',
            component: MangeLovComponent,
          },
        ],
      },
      {
        path: 'inquiry',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: InquiryListComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
