import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {StatusChangeDto, TableListDto} from '@server/common';
import {JobService} from "./job.service";
import {JobDto} from "./dto/job.dto";
import {IJobList, ITableList} from "@vsd-common/lib";

@Controller('job')
export class JobController {

  constructor(private jobService: JobService) {
  }

  @Post()
  loadJobs(@Body() payload: TableListDto): Promise<ITableList<IJobList>> {
    try {
      return this.jobService.load(payload);
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
  manageJob(@Body() body: JobDto, userId: number) {
    try {
      return this.jobService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.jobService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
