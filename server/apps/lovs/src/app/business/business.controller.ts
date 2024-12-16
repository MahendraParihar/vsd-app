import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BusinessService, TableListDto, StatusChangeDto } from '@server/common';
import { IBusinessList, ITableList } from '@vsd-common/lib';
import { BusinessDto } from './dto/business.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {
  }

  @Post()
  loadBusinesses(@Body() payload: TableListDto): Promise<ITableList<IBusinessList>> {
    try {
      return this.businessService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadBusiness(@Param('id') id: number) {
    try {
      return this.businessService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadBusinessDetail(@Param('id') id: number) {
    try {
      return this.businessService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageBusiness(@Body() body: BusinessDto, userId: number) {
    try {
      return this.businessService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateBusinessStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.businessService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
