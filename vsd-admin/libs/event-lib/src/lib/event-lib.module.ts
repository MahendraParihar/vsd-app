import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreLibModule, ngxEditor } from '@vsd-frontend/core-lib';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventComponent } from './event/event.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorModule } from 'ngx-editor';
import { EventService } from './event.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { MatTimepicker, MatTimepickerInput, MatTimepickerToggle } from '@angular/material/timepicker';

@NgModule({
  imports: [
    CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    NgxEditorModule.forRoot(ngxEditor),
    MatTimepickerToggle,
    MatTimepicker,
    MatTimepickerInput,
  ],
  declarations: [EventComponent, ManageEventComponent, EventDetailComponent],
  exports: [EventComponent, ManageEventComponent, EventDetailComponent],
  providers: [EventService, provideMomentDateAdapter(MY_FORMATS)],
})
export class EventLibModule {}
