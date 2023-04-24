import {Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {MandalService} from "../mandal.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {CreateMandalDto} from "../dto/mandal.dto";
import {CreateTempleDto} from "../../temple/dto/temple.dto";

@Controller('mandal')
export class MandalController {
  constructor(private readonly mandalService: MandalService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.mandalService.findAllMandal(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.mandalService.fetchMandalDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() body: CreateMandalDto, @Req() req) {
    return await this.mandalService.createMandal(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manage/:id')
  async update(@Param('id') id: number, @Body() body: CreateMandalDto, ip: string, adminId: number, @Req() req) {
    return await this.mandalService.updateMandal(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.mandalService.updateMandalStatus(body, req.ip, req.user.userId);
  }
}
