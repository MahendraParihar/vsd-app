import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {NewsComponent} from './news/news.component';
import {ManageNewsComponent} from './manage-news/manage-news.component';
import {NewsService} from "./news.service";
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,],
  declarations: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
  exports: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
  providers: [NewsService]
})
export class NewsLibModule {
}
