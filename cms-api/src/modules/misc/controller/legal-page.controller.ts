import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {MiscService} from "../misc.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {CreateFaqDto} from "../dto/faq.dto";

@Controller('legal-page')
export class LegalPageController {
  constructor(private miscService: MiscService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getLegalPageList(@Query() req) {
    return await this.miscService.findLegalPage(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getLegalPage(@Query() req: GetDetailDto) {
    return await this.miscService.fetchLegalPageDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createLegalPage(@Body() req: CreateFaqDto) {
    return await this.miscService.createLegalPage(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async updateLegalPage(@Body() req: CreateFaqDto) {
    return await this.miscService.updateLegalPage(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.miscService.updateLegalPageStatus(body, req.ip, req.user.userId);
  }
}
