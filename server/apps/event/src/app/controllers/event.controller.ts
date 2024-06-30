import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatusChangeDto } from '@server/common';

@Controller('event')
export class EventController {
  @Get()
  loadEvents() {}

  @Get(':id')
  loadEvent() {}

  @Get('details/:id')
  loadEventDetail() {}

  @Post('')
  manageEvent() {}

  @Put('status/:id')
  updateEventStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {}
}
