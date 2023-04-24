import {Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../account/jwt-auth.guard';
import {GetDetailDto, UpdateActiveDto} from '../../../common-dto/basic-input.dto';
import {CurrentAffairService} from "../current-affair.service";
import {CreateCurrentAffairDto} from "../dto/current-affair.dto";

@Controller('current-affair')
export class CurrentAffairController {

  constructor(private service: CurrentAffairService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.service.findAllCurrentAffair(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() body: GetDetailDto) {
    return await this.service.fetchCurrentAffairDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() body: CreateCurrentAffairDto, @Req() req) {
    return await this.service.createCurrentAffair(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manage/:id')
  async update(@Param('id') id: number, @Body() body: CreateCurrentAffairDto, @Req() req) {
    return await this.service.updateCurrentAffair(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateCurrentAffairStatus(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-approval-status')
  async updateApprovalStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateCurrentAffairApprovalStatus(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-comment-allow-status')
  async updateCommentAllowStatus(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateCurrentAffairCommentAllowStatus(body, req.ip, req.user.userId);
  }
}
