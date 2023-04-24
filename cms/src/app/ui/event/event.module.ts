import {NgModule} from '@angular/core';

import {EventRoutingModule} from './event-routing.module';
import {EventListComponent} from './event-list/event-list.component';
import {EventManageComponent} from './event-manage/event-manage.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import { DialogEventDetailComponent } from './dialog-event-detail/dialog-event-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';


@NgModule({
  declarations: [
    EventListComponent,
    EventManageComponent,
    DialogEventDetailComponent,
    EventDetailComponent
  ],
  imports: [
    EventRoutingModule,
    CommonModule,
    ShareModule,
    FlexLayoutModule,
    MaterialModule
  ],
  entryComponents:[
    DialogEventDetailComponent
  ]
})
export class EventModule {
}
