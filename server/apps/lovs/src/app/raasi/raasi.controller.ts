import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RaasiService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IRaasiList, ITableList } from '@vsd-common/lib';
import { RaasiDto } from './dto/raasi.dto';

@Controller('raasi')
export class RaasiController {
  constructor(private raasiService: RaasiService) {
  }

  @Post()
  async loadRaasies(@Body() payload: TableListDto): Promise<ITableList<IRaasiList>> {
    try {
      return await this.raasiService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadRaasi(@Param('id') id: number) {
    try {
      return this.raasiService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadRaasiDetail(@Param('id') id: number) {
    try {
      return this.raasiService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageRaasi(@Body() body: RaasiDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.raasiService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateRaasiStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.raasiService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
