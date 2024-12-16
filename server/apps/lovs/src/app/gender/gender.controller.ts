import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GenderService, TableListDto, StatusChangeDto } from '@server/common';
import { IGenderList, ITableList } from '@vsd-common/lib';
import { GenderDto } from './dto/gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private genderService: GenderService) {
  }

  @Post()
  loadGenders(@Body() payload: TableListDto): Promise<ITableList<IGenderList>> {
    try {
      return this.genderService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadGender(@Param('id') id: number) {
    try {
      return this.genderService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadGenderDetail(@Param('id') id: number) {
    try {
      return this.genderService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageGender(@Body() body: GenderDto, userId: number) {
    try {
      return this.genderService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateGenderStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.genderService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
