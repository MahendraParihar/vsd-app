import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {CurrentAffairService} from './current-affair.service';
import {JwtAuthGuard} from '../account/jwt-auth.guard';
import {PagingDto} from '../../common-dto/paging.dto';
import {CurrentAffairBasicDto} from './dto/current-affair.dto';

@Controller('current-affair')
export class CurrentAffairController {
    constructor(private readonly currentAffairService: CurrentAffairService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async getUpcomingEvent(@Body() body: PagingDto) {
        return await this.currentAffairService.findAllCurrentAffair(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get-current-affair-detail')
    async getEventDetail(@Body() body: CurrentAffairBasicDto) {
        return await this.currentAffairService.fetchDetailById(body);
    }
}
