import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser, Public, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IManageMandal, IMandalList, ITableList } from '@vsd-common/lib';
import { MandalService } from './mandal.service';
import { MandalDto } from './dto/mandal.dto';

@Controller()
export class MandalController {
  constructor(private mandalService: MandalService) {
  }

  @Public()
  @Post('public')
  async loadPublicMandals(@Body() payload: TableListDto): Promise<ITableList<IMandalList>> {
    try {
      return await this.mandalService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadMandals(@Body() payload: TableListDto): Promise<ITableList<IMandalList>> {
    try {
      return await this.mandalService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public')
  async loadPrimaryMandal() {
    try {
      return await this.mandalService.loadPrimaryMandalInfo();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/:url')
  async loadMandalDetailByUrl(@Param('url') url: string) {
    try {
      return await this.mandalService.loadDetailByUrl(url);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  async loadMandal(@Param('id') id: number) {
    try {
      return await this.mandalService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  async loadMandalDetail(@Param('id') id: number) {
    try {
      return await this.mandalService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageMandal(@Body() body: MandalDto, @CurrentUser() currentUser: IAuthUser): Promise<IManageMandal> {
    try {
      return await this.mandalService.manage(body, currentUser ? currentUser.adminUserId : 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateMandalStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.mandalService.updateStatus(id, statusChange, currentUser ? currentUser.adminUserId : 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
