import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EventComponent, ManageEventComponent, EventDetailComponent],
  exports: [EventComponent, ManageEventComponent, EventDetailComponent],
})
export class EventLibModule {}
