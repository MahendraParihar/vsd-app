import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DistrictService, TableListDto, StatusChangeDto } from '@server/common';
import { IDistrictList, ITableList } from '@vsd-common/lib';
import { DistrictDto } from './dto/district.dto';

@Controller('district')
export class DistrictController {
  constructor(private districtService: DistrictService) {
  }

  @Post()
  loadDistricts(@Body() payload: TableListDto): Promise<ITableList<IDistrictList>> {
    try {
      return this.districtService.load(payload);
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

  @Post()
  manageDistrict(@Body() body: DistrictDto, userId: number) {
    try {
      return this.districtService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateDistrictStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.districtService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
