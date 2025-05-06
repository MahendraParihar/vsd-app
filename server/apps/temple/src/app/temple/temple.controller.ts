import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {IAuthUser, ITableList, ITempleList} from '@vsd-common/lib';
import {TempleService} from './temple.service';
import { CurrentUser, Public, StatusChangeDto, TableListDto } from '@server/common';
import {TempleDto} from "./dto/temple.dto";

@Controller()
export class TempleController {

  constructor(private templeService: TempleService) {
  }

  @Public()
  @Post('public')
  async loadPublicTemples(@Body() payload: TableListDto): Promise<ITableList<ITempleList>> {
    try {
      return await this.templeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/home')
  loadHomeTemples(): Promise<ITempleList[]> {
    try {
      return this.templeService.loadHomeTemples();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/:url')
  loadPublicTempleDetail(@Param('url') url: string): Promise<ITempleList> {
    try {
      return this.templeService.loadDetailByUrl(url);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadTemples(@Body() payload: TableListDto): Promise<ITableList<ITempleList>> {
    try {
      return await this.templeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadTemple(@Param('id') id: number) {
    try {
      return this.templeService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadTempleDetail(@Param('id') id: number) {
    try {
      return this.templeService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageTemple(@Body() body: TempleDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.templeService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateTempleStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.templeService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
