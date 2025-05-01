import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IFacilityDetail, IFacilityList, ITableList } from '@vsd-common/lib';
import { FacilityService } from './facility.service';
import { FacilityDto } from './dto/faclity.dto';

@Controller()
export class FacilityController {
  constructor(private facilityService: FacilityService) {
  }

  @Public()
  @Post('public')
  async loadPublicFacility(@Body() payload: TableListDto): Promise<ITableList<IFacilityList>> {
    try {
      return await this.facilityService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/home-facility')
  loadHomeFacility(): Promise<IFacilityList[]> {
    try {
      return this.facilityService.loadHomeFacilities();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public/:url')
  loadFacilityDetailByUrl(@Param('url') url: string): Promise<IFacilityDetail> {
    try {
      return this.facilityService.loadDetailByUrl(url);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadFacilities(@Body() payload: TableListDto): Promise<ITableList<IFacilityList>> {
    try {
      return await this.facilityService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadFacility(@Param('id') id: number) {
    try {
      return this.facilityService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadFacilityDetail(@Param('id') id: number): Promise<IFacilityDetail> {
    try {
      return this.facilityService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Post('manage')
  async manageFacility(@Body() body: FacilityDto, userId: number) {
    try {
      return await this.facilityService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateFacilityStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.facilityService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
