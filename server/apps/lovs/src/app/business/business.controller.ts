import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BusinessService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IBusinessList, ITableList } from '@vsd-common/lib';
import { BusinessDto } from './dto/business.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {
  }

  @Post()
  async loadBusinesses(@Body() payload: TableListDto): Promise<ITableList<IBusinessList>> {
    try {
      return await this.businessService.load(payload);
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
  async manageBusiness(@Body() body: BusinessDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.businessService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateBusinessStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.businessService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
