import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MatrimonialStatusService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IMatrimonialStatusList, ITableList } from '@vsd-common/lib';
import { MatrimonialStatusDto } from './dto/matrimonial-status.dto';

@Controller('matrimonial-status')
export class MatrimonialStatusController {
  constructor(private matrimonialStatusService: MatrimonialStatusService) {
  }

  @Post()
  async loadMatrimonialStatuses(@Body() payload: TableListDto): Promise<ITableList<IMatrimonialStatusList>> {
    try {
      return await this.matrimonialStatusService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadMatrimonialStatus(@Param('id') id: number) {
    try {
      return this.matrimonialStatusService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadMatrimonialStatusDetail(@Param('id') id: number) {
    try {
      return this.matrimonialStatusService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageMatrimonialStatus(@Body() body: MatrimonialStatusDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.matrimonialStatusService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateMatrimonialStatusStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.matrimonialStatusService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
