import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {ITableList, ITempleList} from '@vsd-common/lib';
import {TempleService} from './temple.service';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import {TempleDto} from "./dto/temple.dto";

@Controller()
export class TempleController {

  constructor(private templeService: TempleService) {
  }

  @Public()
  @Post('public')
  loadPublicTemples(@Body() payload: TableListDto): Promise<ITableList<ITempleList>> {
    try {
      return this.templeService.load(payload);
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
  loadTemples(@Body() payload: TableListDto): Promise<ITableList<ITempleList>> {
    try {
      return this.templeService.load(payload);
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
  manageTemple(@Body() body: TempleDto, userId: number) {
    try {
      return this.templeService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateTempleStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.templeService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
