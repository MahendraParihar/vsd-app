import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddictionService, TableListDto, StatusChangeDto } from '@server/common';
import { IAddictionList, ITableList } from '@vsd-common/lib';
import { AddictionDto } from './dto/addiction.dto';

@Controller('addiction')
export class AddictionController {
  constructor(private addictionService: AddictionService) {
  }

  @Post()
  loadAddictions(@Body() payload: TableListDto): Promise<ITableList<IAddictionList>> {
    try {
      return this.addictionService.load(payload);
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

  @Post()
  manageAddiction(@Body() body: AddictionDto, userId: number) {
    try {
      return this.addictionService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateAddictionStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.addictionService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
