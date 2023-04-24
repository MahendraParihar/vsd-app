import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {LovService} from "../lov.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {LovBasicDto} from "../dto/lov.dto";
import {UpdateActiveDto} from "../../../common-dto/basic-input.dto";

@Controller('lov/district')
export class DistrictController {
  constructor(private readonly lovService: LovService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.lovService.findAllDistrict(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getAdmin(@Query() req: LovBasicDto) {
    return await this.lovService.fetchDistrictDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createAdmin(@Req() req) {
    return await this.lovService.createDistrict(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async updateAdmin(@Req() req) {
    return await this.lovService.updateDistrict(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.lovService.updateDistrictStatus(body, req.ip, req.user.userId);
  }
}
