import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RemoteEntryComponent} from './entry.component';
import {NewsListComponent} from "../news-list/news-list.component";
import {ManageNewsComponent} from "../manage-news/manage-news.component";
import {NewsDetailsComponent} from "../news-details/news-details.component";
import {NewsLibModule} from "@vsd-frontend/news-lib";

@NgModule({
  declarations: [RemoteEntryComponent, NewsListComponent, ManageNewsComponent, NewsDetailsComponent],
  imports: [CommonModule, RouterModule.forChild([{
    path: '',
    pathMatch: 'full',
    component: NewsListComponent
  },
    {
      path: 'manage',
      component: ManageNewsComponent
    },
    {
      path: 'manage/:id',
      component: ManageNewsComponent
    },
    {
      path: ':id',
      component: NewsDetailsComponent
    }
  ]), NewsLibModule],
  providers: [],
})
export class RemoteEntryModule {
}
