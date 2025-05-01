import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobCategoryService, StatusChangeDto, TableListDto } from '@server/common';
import { IJobCategory, IJobCategoryList, ITableList } from '@vsd-common/lib';
import { JobCategoryDto } from './dto/job-category.dto';

@Controller('job-category')
export class JobCategoryController {
  constructor(private jobCategoryService: JobCategoryService) {
  }

  @Post()
  async loadJobCategories(@Body() payload: TableListDto): Promise<ITableList<IJobCategoryList>> {
    try {
      return await this.jobCategoryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobCategory(@Param('id') id: number) {
    try {
      return this.jobCategoryService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobCategoryDetail(@Param('id') id: number) {
    try {
      return this.jobCategoryService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageJobCategory(@Body() body: JobCategoryDto, userId: number) {
    try {
      return await this.jobCategoryService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get()
  loadAllJobCategories(): Promise<IJobCategory[]> {
    try {
      return this.jobCategoryService.loadAll();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobCategoryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.jobCategoryService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
