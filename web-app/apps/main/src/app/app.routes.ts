import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistoryComponent } from './history/history.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { TempleListComponent } from './temple/temple-list/temple-list.component';
import { TempleDetailComponent } from './temple/temple-detail/temple-detail.component';
import { MandalListComponent } from './mandal/mandal-list/mandal-list.component';
import { MandalDetailComponent } from './mandal/mandal-detail/mandal-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'event',
        component: EventListComponent,
      },
      {
        path: 'event/:url',
        component: EventDetailComponent,
      },
      {
        path: 'temple',
        component: TempleListComponent,
      },
      {
        path: 'temple/:url',
        component: TempleDetailComponent,
      },
      {
        path: 'mandal',
        component: MandalListComponent,
      },
      {
        path: 'mandal/:url',
        component: MandalDetailComponent,
      },
    ],
  },
  {
    path: 'member',
    loadChildren: () =>
      loadRemoteModule('member', './Module').then((m) => m.RemoteEntryModule),
  },
];
