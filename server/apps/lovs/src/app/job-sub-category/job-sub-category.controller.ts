import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobSubCategoryService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IJobSubCategoryList, ITableList } from '@vsd-common/lib';
import { JobSubCategoryDto } from './dto/job-sub-category.dto';

@Controller('job-sub-category')
export class JobSubCategoryController {
  constructor(private jobSubCategoryService: JobSubCategoryService) {
  }

  @Post()
  async loadJobSubCategories(@Body() payload: TableListDto): Promise<ITableList<IJobSubCategoryList>> {
    try {
      return await this.jobSubCategoryService.load(payload);
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

  @Post('manage')
  async manageJobSubCategory(@Body() body: JobSubCategoryDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.jobSubCategoryService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobSubCategoryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.jobSubCategoryService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
