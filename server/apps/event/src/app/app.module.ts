import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { EventModel } from './models/event.model';
import { EventCoordinatorModel } from './models/event-coordinator.model';
import { EventInterestedModel } from './models/event-interested.model';
import { EventController } from './controllers/event.controller';
import {EventService} from "./controllers/event.service";

@Module({
  imports: [
    CommonModule.forRoot([
        EventModel,
        EventCoordinatorModel,
        EventInterestedModel],
      [],
    ),
    LabelModule.asyncRegister(['admin'])
  ],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
