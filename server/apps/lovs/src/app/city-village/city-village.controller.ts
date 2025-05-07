import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CityVillageService, CurrentUser, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, ICityVillageList, ITableList } from '@vsd-common/lib';
import { CityVillageDto } from './dto/city-village.dto';

@Controller('city-village')
export class CityVillageController {
  constructor(private cityVillageService: CityVillageService) {
  }

  @Post()
  async loadCityVillages(@Body() payload: TableListDto): Promise<ITableList<ICityVillageList>> {
    try {
      return await this.cityVillageService.load(payload);
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

  @Post('manage')
  async manageCityVillage(@Body() body: CityVillageDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.cityVillageService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateCityVillageStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.cityVillageService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
