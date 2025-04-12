import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { NewsService } from './news.service';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { ManageNewsComponent } from './manage-news/manage-news.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    SharedUiLibModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    CoreLibModule,
    NgxEditorModule.forRoot(ngxEditor),
  ],
  declarations: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
  exports: [NewsDetailComponent, NewsComponent, ManageNewsComponent],
  providers: [NewsService],
})
export class NewsLibModule {}
