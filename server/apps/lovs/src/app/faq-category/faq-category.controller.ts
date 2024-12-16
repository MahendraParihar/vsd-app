import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FaqCategoryService, TableListDto, StatusChangeDto } from '@server/common';
import { IFaqCategoryList, ITableList } from '@vsd-common/lib';
import { FaqCategoryDto } from './dto/faq-category.dto';

@Controller('faq-category')
export class FaqCategoryController {
  constructor(private faqCategoryService: FaqCategoryService) {
  }

  @Post()
  loadFaqCategories(@Body() payload: TableListDto): Promise<ITableList<IFaqCategoryList>> {
    try {
      return this.faqCategoryService.load(payload);
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
  manageFaqCategory(@Body() body: FaqCategoryDto, userId: number) {
    try {
      return this.faqCategoryService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateFaqCategoryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.faqCategoryService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
