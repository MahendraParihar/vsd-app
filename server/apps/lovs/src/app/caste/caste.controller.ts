import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CasteService, TableListDto, StatusChangeDto } from '@server/common';
import { ICasteList, ITableList } from '@vsd-common/lib';
import { CasteDto } from './dto/caste.dto';

@Controller('caste')
export class CasteController {
  constructor(private casteService: CasteService) {
  }

  @Post()
  loadCastes(@Body() payload: TableListDto): Promise<ITableList<ICasteList>> {
    try {
      return this.casteService.load(payload);
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
  manageCaste(@Body() body: CasteDto, userId: number) {
    try {
      return this.casteService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateCasteStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.casteService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
