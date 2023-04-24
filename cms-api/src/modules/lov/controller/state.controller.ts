import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {LovService} from "../lov.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {LovBasicDto} from "../dto/lov.dto";
import {UpdateActiveDto} from "../../../common-dto/basic-input.dto";

@Controller('lov/state')
export class StateController {
  constructor(private readonly lovService: LovService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.lovService.findAllState(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getAdmin(@Query() req: LovBasicDto) {
    return await this.lovService.fetchStateDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createAdmin(@Req() req) {
    return await this.lovService.createState(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async updateAdmin(@Req() req) {
    return await this.lovService.updateState(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.lovService.updateStateStatus(body, req.ip, req.user.userId);
  }
}
