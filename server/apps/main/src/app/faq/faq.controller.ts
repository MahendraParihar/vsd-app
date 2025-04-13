import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IFaq, IFaqList, ITableList } from '@vsd-common/lib';
import { FaqService } from './faq.service';
import { FaqDto } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {
  }

  @Public()
  @Post()
  loadPublicFaqs(@Body() payload: TableListDto): Promise<ITableList<IFaqList>> {
    try {
      return this.faqService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  loadBanners(@Body() payload: TableListDto): Promise<ITableList<IFaqList>> {
    try {
      return this.faqService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadBanner(@Param('id') id: number): Promise<IFaq> {
    try {
      return this.faqService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageBanner(@Body() body: FaqDto, userId: number) {
    try {
      return this.faqService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateBannerStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, userId: number) {
    try {
      return this.faqService.updateStatus(id, statusChange, userId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
