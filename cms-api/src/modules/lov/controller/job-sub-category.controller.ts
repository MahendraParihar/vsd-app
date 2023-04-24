import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {LovService} from "../lov.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {LovBasicDto} from "../dto/lov.dto";
import {UpdateActiveDto} from "../../../common-dto/basic-input.dto";

@Controller('lov/job-sub-category')
export class JobSubCategoryController {
  constructor(private readonly lovService: LovService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.lovService.findAllJobSubCategory(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getAdmin(@Query() req: LovBasicDto) {
    return await this.lovService.fetchJobSubCategoryDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createAdmin(@Req() req) {
    return await this.lovService.createJobSubCategory(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async updateAdmin(@Req() req) {
    return await this.lovService.updateJobSubCategory(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.lovService.updateJobSubCategoryStatus(body, req.ip, req.user.userId);
  }
}
