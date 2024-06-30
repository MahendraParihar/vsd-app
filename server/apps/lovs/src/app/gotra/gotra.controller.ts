import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GotraService, TableListDto, StatusChangeDto } from '@server/common';
import { IGotraList, ITableList } from '@vsd-common/lib';
import { GotraDto } from './dto/gotra.dto';

@Controller('gotra')
export class GotraController {
  constructor(private gotraService: GotraService) {
  }

  @Post()
  loadGotras(@Body() payload: TableListDto): Promise<ITableList<IGotraList>> {
    try {
      return this.gotraService.load(payload);
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

  @Post()
  manageGotra(@Body() body: GotraDto, userId: number) {
    try {
      return this.gotraService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateGotraStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.gotraService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
