import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorModule } from 'ngx-editor';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FacilityService } from './facility.service';
import { FacilityComponent } from './facility/facility.component';
import { ManageFacilityComponent } from './manage-facility/manage-facility.component';
import { FacilityDetailComponent } from './facility-detail/facility-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';

@NgModule({
  imports: [
    CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,
    MatCardModule,
    NgxEditorModule.forRoot(ngxEditor),
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
  ],
  declarations: [FacilityComponent, ManageFacilityComponent, FacilityDetailComponent],
  exports: [FacilityComponent, ManageFacilityComponent, FacilityDetailComponent],
  providers: [
    FacilityService,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useValue: MomentDateAdapter },
  ],
})
export class FacilityLibModule {}
