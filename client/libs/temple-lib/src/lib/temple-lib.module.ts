import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTempleComponent } from './manage-temple/manage-temple.component';
import { TempleComponent } from './temple/temple.component';
import { TempleDetailComponent } from './temple-detail/temple-detail.component';
import { TempleService } from './temple.service';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorModule } from 'ngx-editor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule,
    NgxEditorModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule, MatCardModule, NgxEditorModule],
  declarations: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
  exports: [ManageTempleComponent, TempleComponent, TempleDetailComponent],
  providers: [TempleService, {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
  }],
})
export class TempleLibModule {
}
