import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TableListDto, StatusChangeDto } from '@server/common';
import { IMandalList, ITableList } from '@vsd-common/lib';
import { MandalService } from './mandal.service';

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
  loadMandal() {
    try {
      return this.mandalService.getById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadMandalDetail() {
    try {
      return this.mandalService.loadDetailById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('')
  manageMandal() {
    try {
      return this.mandalService.manage();
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
