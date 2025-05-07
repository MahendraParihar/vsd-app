import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CurrentUser, Public, RequestedIp, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IInquiryList, ITableList } from '@vsd-common/lib';
import { InquiryService } from './Inquiry.service';
import { InquiryDto } from './dto/inquiry.dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private inquiryService: InquiryService) {
  }

  @Public()
  @Post('public')
  async submitInquiry(@Body() body: InquiryDto, @RequestedIp() requestedIp: string): Promise<boolean> {
    try {
      await this.inquiryService.manage(body, 1, requestedIp);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadInquiries(@Body() payload: TableListDto): Promise<ITableList<IInquiryList>> {
    try {
      return await this.inquiryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageInquiry(@Body() body: InquiryDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return await this.inquiryService.manage(body, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateInquiryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return await this.inquiryService.updateStatus(id, statusChange, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }
}
