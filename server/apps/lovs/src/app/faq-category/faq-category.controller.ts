import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser, FaqCategoryService, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IFaqCategory, IFaqCategoryList, ITableList } from '@vsd-common/lib';
import { FaqCategoryDto } from './dto/faq-category.dto';

@Controller('faq-category')
export class FaqCategoryController {
  constructor(private faqCategoryService: FaqCategoryService) {
  }

  @Get()
  loadAllFaqCategories(): Promise<IFaqCategory[]> {
    try {
      return this.faqCategoryService.loadAllFaqs();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadFaqCategories(@Body() payload: TableListDto): Promise<ITableList<IFaqCategoryList>> {
    try {
      return await this.faqCategoryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadFaqCategory(@Param('id') id: number) {
    try {
      return this.faqCategoryService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadFaqCategoryDetail(@Param('id') id: number) {
    try {
      return this.faqCategoryService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageFaqCategory(@Body() body: FaqCategoryDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.faqCategoryService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateFaqCategoryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.faqCategoryService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
