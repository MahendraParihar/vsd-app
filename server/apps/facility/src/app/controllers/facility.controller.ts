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
  loadPublicEvents(@Body() payload: TableListDto): Promise<ITableList<IFacilityList>> {
    try {
      return this.facilityService.load(payload);
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
  loadEventDetailByUrl(@Param('url') url: string): Promise<IFacilityDetail> {
    try {
      return this.facilityService.loadDetailByUrl(url);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  loadEvents(@Body() payload: TableListDto): Promise<ITableList<IFacilityList>> {
    try {
      return this.facilityService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadEvent(@Param('id') id: number) {
    try {
      return this.facilityService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadEventDetail(@Param('id') id: number): Promise<IFacilityDetail> {
    try {
      return this.facilityService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageEvent(@Body() body: FacilityDto, userId: number) {
    try {
      return this.facilityService.manage(body, 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateEventStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.facilityService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
