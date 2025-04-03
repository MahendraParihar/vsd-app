import { Route } from '@angular/router';
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
import { EventListComponent } from './event/event-list/event-list.component';
import { ManageEventComponent } from './event/manage-event/manage-event.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { FacilityListComponent } from './facility/facility-list/facility-list.component';
import { ManageFacilityComponent } from './facility/manage-facility/manage-facility.component';
import { FacilityDetailsComponent } from './facility/facility-details/facility-details.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { TempleDetailsComponent } from './temple/temple-details/temple-details.component';
import { TempleListComponent } from './temple/temple-list/temple-list.component';
import { ManageTempleComponent } from './temple/manage-temple/manage-temple.component';
import { ManageNewsComponent } from './news/manage-news/manage-news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { ManageMatrimonialComponent } from './matrimonial/manage-matrimonial/manage-matrimonial.component';
import { MatrimonialDetailsComponent } from './matrimonial/matrimonial-details/matrimonial-details.component';
import { MatrimonialListComponent } from './matrimonial/matrimonial-list/matrimonial-list.component';
import { MandalListComponent } from './mandal/mandal-list/mandal-list.component';
import { ManageMandalComponent } from './mandal/manage-mandal/manage-mandal.component';
import { MandalDetailsComponent } from './mandal/mandal-details/mandal-details.component';
import { LovComponent } from './lov/lov/lov.component';
import { ManageLovComponent } from './lov/manage-lov/manage-lov.component';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { ManageFamilyComponent } from './family/manage-family/manage-family.component';
import { FamilyDetailsComponent } from './family/family-details/family-details.component';
import { JobDetailsComponent } from './job/job-details/job-details.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { ManageJobComponent } from './job/manage-job/manage-job.component';

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
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: FacilityListComponent,
          },
          {
            path: 'manage',
            component: ManageFacilityComponent,
          },
          {
            path: 'manage/:id',
            component: ManageFacilityComponent,
          },
          {
            path: ':id',
            component: FacilityDetailsComponent,
          },
        ],
      },
      {
        path: 'temple',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: TempleListComponent,
          },
          {
            path: 'manage',
            component: ManageTempleComponent,
          },
          {
            path: 'manage/:id',
            component: ManageTempleComponent,
          },
          {
            path: ':id',
            component: TempleDetailsComponent,
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: NewsListComponent,
          },
          {
            path: 'manage',
            component: ManageNewsComponent,
          },
          {
            path: 'manage/:id',
            component: ManageNewsComponent,
          },
          {
            path: ':id',
            component: NewsDetailsComponent,
          },
        ],
      },
      {
        path: 'matrimonial',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MatrimonialListComponent,
          },
          {
            path: 'manage',
            component: ManageMatrimonialComponent,
          },
          {
            path: 'manage/:id',
            component: ManageMatrimonialComponent,
          },
          {
            path: ':id',
            component: MatrimonialDetailsComponent,
          },
        ],
      },
      {
        path: 'mandal',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MandalListComponent,
          },
          {
            path: 'manage',
            component: ManageMandalComponent,
          },
          {
            path: 'manage/:id',
            component: ManageMandalComponent,
          },
          {
            path: ':id',
            component: MandalDetailsComponent,
          },
        ],
      },
      {
        path: 'lov/:type',
        component: LovComponent,
      },
      {
        path: 'lov/manage/:type',
        component: ManageLovComponent,
      },
      {
        path: 'lov/manage/:type/:id',
        component: ManageLovComponent,
      },
      {
        path: 'job',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: JobListComponent,
          },
          {
            path: 'manage',
            component: ManageJobComponent,
          },
          {
            path: 'manage/:id',
            component: ManageJobComponent,
          },
          {
            path: ':id',
            component: JobDetailsComponent,
          },
        ],
      },
      {
        path: 'family',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: FamilyListComponent,
          },
          {
            path: 'manage',
            component: ManageFamilyComponent,
          },
          {
            path: 'manage/:id',
            component: ManageFamilyComponent,
          },
          {
            path: ':id',
            component: FamilyDetailsComponent,
          },
          {
            path: ':id/:path',
            component: FamilyDetailsComponent,
          },
        ],
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: EventListComponent,
          },
          {
            path: 'manage',
            component: ManageEventComponent,
          },
          {
            path: 'manage/:id',
            component: ManageEventComponent,
          },
          {
            path: ':id',
            component: EventDetailsComponent,
          },
        ],
      },
    ],
  },
];
