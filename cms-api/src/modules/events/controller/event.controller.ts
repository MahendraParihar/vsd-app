import {Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {EventService} from '../event.service';
import {JwtAuthGuard} from '../../account/jwt-auth.guard';
import {CreateEventDto} from '../dto/event.dto';
import {GetDetailDto, UpdateActiveDto} from '../../../common-dto/basic-input.dto';

@Controller('event')
export class EventController {

  constructor(private service: EventService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.service.findAllEvent(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.service.fetchEventDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() body: CreateEventDto, @Req() req) {
    return await this.service.createEvent(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manage/:id')
  async update(@Param('id') id: number, @Body() body: CreateEventDto, @Req() req) {
    return await this.service.updateEvent(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateEventStatus(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-published-status')
  async updatePublishStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateEventPublishStatus(body, req.ip, req.user.userId);
  }

}
