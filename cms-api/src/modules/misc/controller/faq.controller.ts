import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {MiscService} from "../misc.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {CreateFaqDto} from "../dto/faq.dto";

@Controller('faq')
export class FaqController {
  constructor(private miscService: MiscService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.miscService.findAllFAQ(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.miscService.fetchFAQDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateFaqDto) {
    return await this.miscService.createFAQ(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateFaqDto) {
    return await this.miscService.updateFAQ(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.miscService.updateFAQStatus(body, req.ip, req.user.userId);
  }
}
