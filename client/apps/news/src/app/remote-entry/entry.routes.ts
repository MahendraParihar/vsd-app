import { Route } from '@angular/router';
import { NewsListComponent } from '../news-list/news-list.component';
import { ManageNewsComponent } from '../manage-news/manage-news.component';
import { NewsDetailsComponent } from '../news-details/news-details.component';

export const remoteRoutes: Route[] = [
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
];
