import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobStatusService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IJobStatusList, ITableList } from '@vsd-common/lib';
import { JobStatusDto } from './dto/job-status.dto';

@Controller('job-status')
export class JobStatusController {
  constructor(private jobStatusService: JobStatusService) {
  }

  @Post()
  async loadJobTypes(@Body() payload: TableListDto): Promise<ITableList<IJobStatusList>> {
    try {
      return await this.jobStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobType(@Param('id') id: number) {
    try {
      return this.jobStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobTypeDetail(@Param('id') id: number) {
    try {
      return this.jobStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageJobType(@Body() body: JobStatusDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.jobStatusService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.jobStatusService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
