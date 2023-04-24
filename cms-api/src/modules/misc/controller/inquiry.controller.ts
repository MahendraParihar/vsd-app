import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {MiscService} from "../misc.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {CreateInquiryDto} from "../dto/inquiry.dto";

@Controller('inquiry')
export class InquiryController {
  constructor(private miscService: MiscService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.miscService.findAllInquiry(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.miscService.fetchInquiryDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateInquiryDto) {
    return await this.miscService.createInquiry(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateInquiryDto) {
    return await this.miscService.updateInquiry(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.miscService.updateInquiryStatus(body, req.ip, req.user.userId);
  }
}
