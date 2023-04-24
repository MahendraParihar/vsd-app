import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../account/jwt-auth.guard";
import {AdminUserService} from "./admin-user.service";
import {AdminUserDto, AdminUserUpdateStatusDto} from "./dto/admin-user.dto";
import {UpdateActiveDto} from "../../common-dto/basic-input.dto";

@Controller('admin-user')
export class AdminUserController {

  constructor(private readonly adminUserService: AdminUserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.adminUserService.findAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async getAdmin(@Req() req) {
    return await this.adminUserService.fetchDetailById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async createAdmin(@Req() req) {
    return await this.adminUserService.create(req.body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('manage')
  async updateAdmin(@Body() body: AdminUserDto, @Req() req) {
    body.adminId = req.user.userId;
    return await this.adminUserService.update(body, req.connection.remoteAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStatus(@Body() body: AdminUserUpdateStatusDto, @Req() req) {
    return await this.adminUserService.updateStatus(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('master-data')
  async getMasterData() {
    return await this.adminUserService.getAdminMasterData();
  }
}
