import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RaasiService, TableListDto, StatusChangeDto } from '@server/common';
import { IRaasiList, ITableList } from '@vsd-common/lib';
import { RaasiDto } from './dto/raasi.dto';

@Controller('raasi')
export class RaasiController {
  constructor(private raasiService: RaasiService) {
  }

  @Post()
  loadRaasies(@Body() payload: TableListDto): Promise<ITableList<IRaasiList>> {
    try {
      return this.raasiService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadRaasi(@Param('id') id: number) {
    try {
      return this.raasiService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadRaasiDetail(@Param('id') id: number) {
    try {
      return this.raasiService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageRaasi(@Body() body: RaasiDto, userId: number) {
    try {
      return this.raasiService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateRaasiStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.raasiService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
