import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {LovService} from "../lov.service";
import {LovBasicDto} from "../dto/lov.dto";
import {UpdateActiveDto} from "../../../common-dto/basic-input.dto";

@Controller('lov/addiction')
export class AddictionController {

  constructor(private readonly lovService: LovService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.lovService.findAllAddiction(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getAddiction(@Query() req: LovBasicDto) {
    return await this.lovService.fetchAddictionDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createAddiction(@Req() req) {
    return await this.lovService.createAddiction(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async updateAddiction(@Req() req) {
    return await this.lovService.updateAddiction(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateAddictionStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.lovService.updateAddictionStatus(body, req.ip, req.user.userId);
  }

}
