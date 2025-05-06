import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DistrictService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IDistrictList, ITableList } from '@vsd-common/lib';
import { DistrictDto } from './dto/district.dto';

@Controller('district')
export class DistrictController {
  constructor(private districtService: DistrictService) {
  }

  @Post()
  async loadDistricts(@Body() payload: TableListDto): Promise<ITableList<IDistrictList>> {
    try {
      return await this.districtService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadDistrict(@Param('id') id: number) {
    try {
      return this.districtService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadDistrictDetail(@Param('id') id: number) {
    try {
      return this.districtService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageDistrict(@Body() body: DistrictDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.districtService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateDistrictStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.districtService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
