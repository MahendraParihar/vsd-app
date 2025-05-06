import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MatrimonialRequestedStatusService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IMatrimonialRequestedStatusList, ITableList } from '@vsd-common/lib';
import { MatrimonialRequestedStatusDto } from './dto/matrimonial-requested-status.dto';

@Controller('matrimonial-requested-status')
export class MatrimonialRequestedStatusController {
  constructor(private matrimonialRequestedStatusService: MatrimonialRequestedStatusService) {
  }

  @Post()
  async loadMatrimonialRequestedStatuses(@Body() payload: TableListDto): Promise<ITableList<IMatrimonialRequestedStatusList>> {
    try {
      return await this.matrimonialRequestedStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadMatrimonialRequestedStatus(@Param('id') id: number) {
    try {
      return this.matrimonialRequestedStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadMatrimonialRequestedStatusDetail(@Param('id') id: number) {
    try {
      return this.matrimonialRequestedStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageMatrimonialRequestedStatus(@Body() body: MatrimonialRequestedStatusDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.matrimonialRequestedStatusService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateMatrimonialRequestedStatusStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.matrimonialRequestedStatusService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
