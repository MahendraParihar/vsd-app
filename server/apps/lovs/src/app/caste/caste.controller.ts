import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CasteService, CurrentUser, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, ICasteList, ITableList } from '@vsd-common/lib';
import { CasteDto } from './dto/caste.dto';

@Controller('caste')
export class CasteController {
  constructor(private casteService: CasteService) {
  }

  @Post()
  async loadCastes(@Body() payload: TableListDto): Promise<ITableList<ICasteList>> {
    try {
      return await this.casteService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadCaste(@Param('id') id: number) {
    try {
      return this.casteService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadCasteDetail(@Param('id') id: number) {
    try {
      return this.casteService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageCaste(@Body() body: CasteDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.casteService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateCasteStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.casteService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
