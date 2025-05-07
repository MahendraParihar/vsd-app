import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CountryService, CurrentUser, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, ICountryList, ITableList } from '@vsd-common/lib';
import { CountryDto } from './dto/country.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {
  }

  @Post()
  async loadCountries(@Body() payload: TableListDto): Promise<ITableList<ICountryList>> {
    try {
      return await this.countryService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadCountry(@Param('id') id: number) {
    try {
      return this.countryService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadCountryDetail(@Param('id') id: number) {
    try {
      return this.countryService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageCountry(@Body() body: CountryDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.countryService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateCountryStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser): Promise<void> {
    try {
      await this.countryService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
