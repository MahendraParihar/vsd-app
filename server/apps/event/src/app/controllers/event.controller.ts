import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IEventDetail, IEventList, ITableList } from '@vsd-common/lib';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller()
export class EventController {
  constructor(private eventService: EventService) {
  }

  @Public()
  @Post('public')
  async loadPublicEvents(@Body() payload: TableListDto): Promise<ITableList<IEventList>> {
    try {
      return this.eventService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/upcoming-event')
  async loadUpcomingEvent(): Promise<IEventDetail[]> {
    try {
      return await this.eventService.loadUpcomingEvents();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/:url')
  async loadEventDetailByUrl(@Param('url') url: string): Promise<IEventDetail> {
    try {
      return await this.eventService.loadDetailByUrl(url);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadEvents(@Body() payload: TableListDto): Promise<ITableList<IEventList>> {
    try {
      return await this.eventService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadEvent(@Param('id') id: number) {
    try {
      return this.eventService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadEventDetail(@Param('id') id: number): Promise<IEventDetail> {
    try {
      return this.eventService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageEvent(@Body() body: EventDto, userId: number) {
    try {
      return await this.eventService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateEventStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.eventService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
