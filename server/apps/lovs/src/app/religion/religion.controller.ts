import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReligionService, TableListDto, StatusChangeDto } from '@server/common';
import { IReligionList, ITableList } from '@vsd-common/lib';
import { ReligionDto } from './dto/religion.dto';

@Controller('religion')
export class ReligionController {
  constructor(private religionService: ReligionService) {
  }

  @Post()
  loadReligions(@Body() payload: TableListDto): Promise<ITableList<IReligionList>> {
    try {
      return this.religionService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadReligion(@Param('id') id: number) {
    try {
      return this.religionService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadReligionDetail(@Param('id') id: number) {
    try {
      return this.religionService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageReligion(@Body() body: ReligionDto, userId: number) {
    try {
      return this.religionService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateReligionStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.religionService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
