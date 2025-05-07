import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddictionService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IAddictionList, ITableList } from '@vsd-common/lib';
import { AddictionDto } from './dto/addiction.dto';

@Controller('addiction')
export class AddictionController {
  constructor(private addictionService: AddictionService) {
  }

  @Post()
  async loadAddictions(@Body() payload: TableListDto): Promise<ITableList<IAddictionList>> {
    try {
      return await this.addictionService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadAddiction(@Param('id') id: number) {
    try {
      return this.addictionService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadAddictionDetail(@Param('id') id: number) {
    try {
      return this.addictionService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageAddiction(@Body() body: AddictionDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.addictionService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateAddictionStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.addictionService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
