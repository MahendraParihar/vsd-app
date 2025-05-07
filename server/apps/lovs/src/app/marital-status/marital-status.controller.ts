import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MaritalStatusService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IMaritalStatusList, ITableList } from '@vsd-common/lib';
import { MaritalStatusDto } from './dto/marital-status.dto';

@Controller('marital-status')
export class MaritalStatusController {
  constructor(private maritalStatusService: MaritalStatusService) {
  }

  @Post()
  async loadJobTypes(@Body() payload: TableListDto): Promise<ITableList<IMaritalStatusList>> {
    try {
      return await this.maritalStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadJobType(@Param('id') id: number) {
    try {
      return this.maritalStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadJobTypeDetail(@Param('id') id: number) {
    try {
      return this.maritalStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageJobType(@Body() body: MaritalStatusDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.maritalStatusService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateJobTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.maritalStatusService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
