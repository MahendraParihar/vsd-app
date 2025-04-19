import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { FaqComponent } from './faq/faq.component';
import { ManageFaqComponent } from './manage-faq/manage-faq.component';
import { FaqService } from './faq.service';
import { NgxEditorModule } from 'ngx-editor';
import { LovsLibModule } from '@vsd-frontend/lovs-lib';

@NgModule({
  declarations: [FaqComponent, ManageFaqComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    SharedUiLibModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    CoreLibModule,
    LovsLibModule,
    NgxEditorModule.forRoot(ngxEditor),
  ],
  exports: [FaqComponent, ManageFaqComponent],
  providers: [FaqService],
})
export class FaqLibModule {}
