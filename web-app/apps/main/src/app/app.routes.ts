import { Route } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistoryComponent } from './history/history.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventDetailComponent } from './event/details/event-detail.component';
import { TempleDetailComponent } from './temple/details/temple-detail.component';
import { FacilityDetailComponent } from './facility/details/facility-detail.component';
import { FacilityComponent } from './facility/facility.component';
import { TempleComponent } from './temple/temple.component';
import { EventComponent } from './event/event.component';
import { MandalComponent } from './mandal/mandal.component';
import { MandalDetailComponent } from './mandal/details/mandal-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'event',
        component: EventComponent
      },
      {
        path: 'event/:url',
        component: EventDetailComponent
      },
      {
        path: 'temple',
        component: TempleComponent
      },
      {
        path: 'temple/:url',
        component: TempleDetailComponent
      },
      {
        path: 'mandal',
        component: MandalComponent
      },
      {
        path: 'mandal/:url',
        component: MandalDetailComponent
      },
      {
        path: 'facility',
        component: FacilityComponent
      },
      {
        path: 'facility/:url',
        component: FacilityDetailComponent
      }
    ]
  }
];
