import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {MiscService} from './misc.service';
import {JwtAuthGuard} from '../account/jwt-auth.guard';
import {AddInquiryDto} from './dto/add-inquiry.dto';
import {PP_PAGE, T_C_PAGE} from '../../core/constants/config-constants';

@Controller('misc')
export class MiscController {
    constructor(private miscService: MiscService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-mandal-list')
    async getMandalList(@Req() req) {
        return await this.miscService.findAllMandal();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-mandal-member')
    async getMandalMemberList(@Body() req: number) {
        return await this.miscService.findAllMandalMember(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-trustee')
    async getTrusteeList(@Body() req) {
        return await this.miscService.findAllTrustee();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-temple-list')
    async getTempleList(@Req() req) {
        return await this.miscService.findAllTemple();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-faq-list')
    async getFaqList(@Req() req) {
        return await this.miscService.findAllFAQs();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-term-condition')
    async getTermCondtionPage(@Req() req) {
        return await this.miscService.findLegalPage(T_C_PAGE);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-privacy-policy')
    async getPrivacyPolicyPage(@Req() req) {
        return await this.miscService.findLegalPage(PP_PAGE);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('/post-inquiry')
    async postInquiry(@Body() body: AddInquiryDto) {
        return await this.miscService.addInquiry(body);
    }
}
