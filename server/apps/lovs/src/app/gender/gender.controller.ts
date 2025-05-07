import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GenderService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IGenderList, ITableList } from '@vsd-common/lib';
import { GenderDto } from './dto/gender.dto';

@Controller('gender')
export class GenderController {
  constructor(private genderService: GenderService) {
  }

  @Post()
  async loadGenders(@Body() payload: TableListDto): Promise<ITableList<IGenderList>> {
    try {
      return await this.genderService.load(payload);
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
  async manageGender(@Body() body: GenderDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.genderService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateGenderStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.genderService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
