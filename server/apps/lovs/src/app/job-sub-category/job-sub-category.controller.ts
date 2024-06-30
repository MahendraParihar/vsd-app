import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobSubCategoryService, TableListDto, StatusChangeDto } from '@server/common';
import { IJobSubCategoryList, ITableList } from '@vsd-common/lib';
import { JobSubCategoryDto } from './dto/job-sub-category.dto';

@Controller('job-sub-category')
export class JobSubCategoryController {
  constructor(private jobSubCategoryService: JobSubCategoryService) {
  }

  @Post()
  loadJobSubCategories(@Body() payload: TableListDto): Promise<ITableList<IJobSubCategoryList>> {
    try {
      return this.jobSubCategoryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobSubCategory(@Param('id') id: number) {
    try {
      return this.jobSubCategoryService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobSubCategoryDetail(@Param('id') id: number) {
    try {
      return this.jobSubCategoryService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageJobSubCategory(@Body() body: JobSubCategoryDto, userId: number) {
    try {
      return this.jobSubCategoryService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobSubCategoryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.jobSubCategoryService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
