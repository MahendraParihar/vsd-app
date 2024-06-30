import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {StatusChangeDto, TableListDto} from '@server/common';
import {IMandalList, ITableList} from '@vsd-common/lib';
import {MandalService} from './mandal.service';
import {MandalDto} from "./dto/mandal.dto";

@Controller('mandal')
export class MandalController {
  constructor(private mandalService: MandalService) {
  }

  @Post()
  loadMandals(@Body() payload: TableListDto): Promise<ITableList<IMandalList>> {
    try {
      return this.mandalService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadMandal(@Param('id') id: number) {
    try {
      return this.mandalService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadMandalDetail(@Param('id') id: number) {
    try {
      return this.mandalService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageMandal(@Body() body: MandalDto, userId: number) {
    try {
      return this.mandalService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateMandalStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.mandalService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
