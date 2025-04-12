import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { PageComponent } from './page/page.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { PageService } from './page.service';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [PageComponent, ManagePageComponent],
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
  providers: [PageService],
  exports: [PageComponent, ManagePageComponent],
})
export class PageLibModule {}
