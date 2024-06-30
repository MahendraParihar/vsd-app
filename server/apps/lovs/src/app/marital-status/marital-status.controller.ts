import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MaritalStatusService, TableListDto, StatusChangeDto } from '@server/common';
import { IMaritalStatusList, ITableList } from '@vsd-common/lib';
import { MaritalStatusDto } from './dto/marital-status.dto';

@Controller('marital-status')
export class MaritalStatusController {
  constructor(private maritalStatusService: MaritalStatusService) {
  }

  @Post()
  loadJobTypes(@Body() payload: TableListDto): Promise<ITableList<IMaritalStatusList>> {
    try {
      return this.maritalStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobType(@Param('id') id: number) {
    try {
      return this.maritalStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobTypeDetail(@Param('id') id: number) {
    try {
      return this.maritalStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageJobType(@Body() body: MaritalStatusDto, userId: number) {
    try {
      return this.maritalStatusService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.maritalStatusService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
