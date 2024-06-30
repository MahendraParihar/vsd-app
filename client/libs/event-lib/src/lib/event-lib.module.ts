import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './event/event.component';
import {ManageEventComponent} from './manage-event/manage-event.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventService} from "./event.service";
import {CoreLibModule} from "@vsd-frontend/core-lib";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {SharedUiLibModule} from "@vsd-frontend/shared-ui-lib";

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,],
  declarations: [EventComponent, ManageEventComponent, EventDetailComponent],
  exports: [EventComponent, ManageEventComponent, EventDetailComponent],
  providers: [EventService]
})
export class EventLibModule {
}
