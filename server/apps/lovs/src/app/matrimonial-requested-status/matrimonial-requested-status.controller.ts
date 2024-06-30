import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MatrimonialRequestedStatusService, TableListDto, StatusChangeDto } from '@server/common';
import { IMatrimonialRequestedStatusList, ITableList } from '@vsd-common/lib';
import { MatrimonialRequestedStatusDto } from './dto/matrimonial-requested-status.dto';

@Controller('matrimonial-requested-status')
export class MatrimonialRequestedStatusController {
  constructor(private matrimonialRequestedStatusService: MatrimonialRequestedStatusService) {
  }

  @Post()
  loadMatrimonialRequestedStatuses(@Body() payload: TableListDto): Promise<ITableList<IMatrimonialRequestedStatusList>> {
    try {
      return this.matrimonialRequestedStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadMatrimonialRequestedStatus(@Param('id') id: number) {
    try {
      return this.matrimonialRequestedStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadMatrimonialRequestedStatusDetail(@Param('id') id: number) {
    try {
      return this.matrimonialRequestedStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageMatrimonialRequestedStatus(@Body() body: MatrimonialRequestedStatusDto, userId: number) {
    try {
      return this.matrimonialRequestedStatusService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateMatrimonialRequestedStatusStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.matrimonialRequestedStatusService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
