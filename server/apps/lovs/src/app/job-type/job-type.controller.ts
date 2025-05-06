import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobTypeService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IJobTypeList, ITableList } from '@vsd-common/lib';
import { JobTypeDto } from './dto/job-type.dto';

@Controller('job-type')
export class JobTypeController {
  constructor(private jobTypeService: JobTypeService) {
  }

  @Post()
  async loadJobTypes(@Body() payload: TableListDto): Promise<ITableList<IJobTypeList>> {
    try {
      return await this.jobTypeService.load(payload);
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
  async manageJobType(@Body() body: JobTypeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.jobTypeService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.jobTypeService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
