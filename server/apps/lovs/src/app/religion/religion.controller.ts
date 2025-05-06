import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReligionService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IReligionList, ITableList } from '@vsd-common/lib';
import { ReligionDto } from './dto/religion.dto';

@Controller('religion')
export class ReligionController {
  constructor(private religionService: ReligionService) {
  }

  @Post()
  async loadReligions(@Body() payload: TableListDto): Promise<ITableList<IReligionList>> {
    try {
      return await this.religionService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadReligion(@Param('id') id: number) {
    try {
      return this.religionService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadReligionDetail(@Param('id') id: number) {
    try {
      return this.religionService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageReligion(@Body() body: ReligionDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.religionService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateReligionStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.religionService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
