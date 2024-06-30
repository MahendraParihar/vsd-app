import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ITempleList, ITableList } from '@vsd-common/lib';
import { TempleService } from './temple.service';
import { StatusChangeDto, TableListDto } from '@server/common';

@Controller('temple')
export class TempleController {

  constructor(private templeService: TempleService) {
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
  loadTemple() {
    try {
      return this.templeService.getById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadTempleDetail() {
    try {
      return this.templeService.loadDetailById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageTemple() {
    try {
      return this.templeService.manage();
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
