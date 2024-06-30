import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { ManageNewsComponent } from './manage-news/manage-news.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
  exports: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
})
export class NewsLibModule {}
