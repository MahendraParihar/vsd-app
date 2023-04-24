import {Module} from '@nestjs/common';
import {EventController} from './controller/event.controller';
import {EventService} from './event.service';
import {eventProvider} from './event.providers';
import {CommonModule} from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [EventController],
  providers: [EventService,
    ...eventProvider],
})
export class EventsModule {
}
