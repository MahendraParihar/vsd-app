import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {MandalService} from "../mandal.service";
import {CreateMandalMemberDto} from "../dto/mandal-member.dto";

@Controller('mandal-member')
export class MandalMemberController {
  constructor(private readonly mandalService: MandalService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.mandalService.findAllMandalMember(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.mandalService.fetchMandalMemberDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateMandalMemberDto) {
    return await this.mandalService.createMandalMember(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateMandalMemberDto) {
    return await this.mandalService.updateMandalMember(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.mandalService.updateMandalMemberStatus(body, req.ip, req.user.userId);
  }
}
