import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { StatusChangeDto, TableListDto } from '@server/common';
import { IInquiryList, ITableList } from '@vsd-common/lib';
import { InquiryService } from './Inquiry.service';
import { InquiryDto } from './dto/inquiry.dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private inquiryService: InquiryService) {
  }

  @Post()
  loadInquiries(@Body() payload: TableListDto): Promise<ITableList<IInquiryList>> {
    try {
      return this.inquiryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageInquiry(@Body() body: InquiryDto) {
    try {
      return this.inquiryService.manage(body);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateInquiryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.inquiryService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
