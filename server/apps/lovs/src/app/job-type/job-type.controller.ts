import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobTypeService, TableListDto, StatusChangeDto } from '@server/common';
import { IJobTypeList, ITableList } from '@vsd-common/lib';
import { JobTypeDto } from './dto/job-type.dto';

@Controller('job-type')
export class JobTypeController {
  constructor(private jobTypeService: JobTypeService) {
  }

  @Post()
  loadJobTypes(@Body() payload: TableListDto): Promise<ITableList<IJobTypeList>> {
    try {
      return this.jobTypeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobType(@Param('id') id: number) {
    try {
      return this.jobTypeService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobTypeDetail(@Param('id') id: number) {
    try {
      return this.jobTypeService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageJobType(@Body() body: JobTypeDto, userId: number) {
    try {
      return this.jobTypeService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.jobTypeService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
