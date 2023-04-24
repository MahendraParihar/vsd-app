import {Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {TempleService} from "./temple.service";
import {JwtAuthGuard} from "../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {CreateTempleDto} from "./dto/temple.dto";

@Controller('temple')
export class TempleController {
  constructor(private readonly templeService: TempleService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.templeService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.templeService.fetchDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() body: CreateTempleDto, @Req() req) {
    return await this.templeService.create(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manage/:id')
  async update(@Param('id') id: number, @Body() body: CreateTempleDto, @Req() req) {
    return await this.templeService.update(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.templeService.updateStatus(body, req.ip, req.user.userId);
  }
}
