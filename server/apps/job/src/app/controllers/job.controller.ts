import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { CurrentUser, StatusChangeDto, TableListDto } from '@server/common';
import {JobService} from "./job.service";
import {JobDto} from "./dto/job.dto";
import {IAuthUser, IJobList, ITableList} from "@vsd-common/lib";

@Controller('job')
export class JobController {

  constructor(private jobService: JobService) {
  }

  @Post()
  async loadJobs(@Body() payload: TableListDto): Promise<ITableList<IJobList>> {
    try {
      return await this.jobService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJob(@Param('id') id: number) {
    try {
      return this.jobService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobDetail(@Param('id') id: number) {
    try {
      return this.jobService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async manageJob(@Body() body: JobDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.jobService.manage(body, currentUser ? currentUser.adminUserId : 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.jobService.updateStatus(id, statusChange, currentUser ? currentUser.adminUserId : 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
