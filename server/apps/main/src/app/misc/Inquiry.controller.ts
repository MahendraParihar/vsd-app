import { Body, Controller, Param, Post, Put, Req } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IInquiryList, ITableList } from '@vsd-common/lib';
import { InquiryService } from './Inquiry.service';
import { InquiryDto } from './dto/inquiry.dto';
import { Request } from 'express';

@Controller('inquiry')
export class InquiryController {
  constructor(private inquiryService: InquiryService) {
  }

  @Public()
  @Post('public')
  async submitInquiry(@Req() request: Request, @Body() body: InquiryDto): Promise<boolean> {
    try {
      await this.inquiryService.manage(body, 1, request.ip);
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
  async manageInquiry(@Req() request: Request, @Body() body: InquiryDto) {
    try {
      return await this.inquiryService.manage(body, 1, request.ip);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateInquiryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return await this.inquiryService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
