import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GotraService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IGotraList, ITableList } from '@vsd-common/lib';
import { GotraDto } from './dto/gotra.dto';

@Controller('gotra')
export class GotraController {
  constructor(private gotraService: GotraService) {
  }

  @Post()
  async loadGotras(@Body() payload: TableListDto): Promise<ITableList<IGotraList>> {
    try {
      return await this.gotraService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadGotra(@Param('id') id: number) {
    try {
      return this.gotraService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadGotraDetail(@Param('id') id: number) {
    try {
      return this.gotraService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageGotra(@Body() body: GotraDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.gotraService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateGotraStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.gotraService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
