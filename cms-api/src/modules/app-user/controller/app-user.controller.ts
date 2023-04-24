import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../account/jwt-auth.guard';
import {GetDetailDto, UpdateActiveDto} from '../../../common-dto/basic-input.dto';
import {AppUserService} from "../app-user.service";
import {CreateAppUserDto} from "../dto/app-user.dto";

@Controller('app-user')
export class AppUserController {

  constructor(private service: AppUserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.service.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.service.fetchDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateAppUserDto) {
    return await this.service.create(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateAppUserDto) {
    return await this.service.update(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateStatus(body, req.ip, req.user.userId);
  }
}
