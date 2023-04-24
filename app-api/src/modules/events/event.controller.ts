import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {EventService} from './event.service';
import {JwtAuthGuard} from '../account/jwt-auth.guard';
import {EventBasicDto} from './dto/event.dto';
import {PagingDto} from '../../common-dto/paging.dto';

@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async getUpcomingEvent(@Body() body: PagingDto) {
        return await this.eventService.findAllUpcomingEvents(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get-event-detail')
    async getEventDetail(@Body() body: EventBasicDto) {
        return await this.eventService.fetchDetailById(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update-interested-flag')
    async markEventInterestedMember(@Body() req) {
        return await this.eventService.updateInterestedFlag(req.body);
    }

}
