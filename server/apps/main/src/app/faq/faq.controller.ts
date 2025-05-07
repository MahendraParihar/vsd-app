import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser, Public, RequestedIp, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IFaq, IFaqList, ITableList } from '@vsd-common/lib';
import { FaqService } from './faq.service';
import { FaqDto } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {
  }

  @Public()
  @Post()
  async loadPublicFaqs(@Body() payload: TableListDto): Promise<ITableList<IFaqList>> {
    try {
      return await this.faqService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadBanners(@Body() payload: TableListDto): Promise<ITableList<IFaqList>> {
    try {
      return await this.faqService.load(payload);
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
  async manageBanner(@Body() body: FaqDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return await this.faqService.manage(body, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateBannerStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return this.faqService.updateStatus(id, statusChange, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }
}
