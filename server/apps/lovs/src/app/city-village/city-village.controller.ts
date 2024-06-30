import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CityVillageService, TableListDto, StatusChangeDto } from '@server/common';
import { ICityVillageList, ITableList } from '@vsd-common/lib';
import { CityVillageDto } from './dto/city-village.dto';

@Controller('city-village')
export class CityVillageController {
  constructor(private cityVillageService: CityVillageService) {
  }

  @Post()
  loadCityVillages(@Body() payload: TableListDto): Promise<ITableList<ICityVillageList>> {
    try {
      return this.cityVillageService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadCityVillage(@Param('id') id: number) {
    try {
      return this.cityVillageService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadCityVillageDetail(@Param('id') id: number) {
    try {
      return this.cityVillageService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageCityVillage(@Body() body: CityVillageDto, userId: number) {
    try {
      return this.cityVillageService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateCityVillageStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.cityVillageService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
