import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IMandalList, ITableList } from '@vsd-common/lib';
import { MandalService } from './mandal.service';
import { MandalDto } from './dto/mandal.dto';

@Controller()
export class MandalController {
  constructor(private mandalService: MandalService) {
  }

  @Public()
  @Post('public')
  async loadPublicMandals(@Body() payload: TableListDto): Promise<ITableList<IMandalList>> {
    try {
      return await this.mandalService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadMandals(@Body() payload: TableListDto): Promise<ITableList<IMandalList>> {
    try {
      return await this.mandalService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('public')
  async loadPrimaryMandal() {
    try {
      return await this.mandalService.loadPrimaryMandalInfo();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  async loadMandal(@Param('id') id: number) {
    try {
      return await this.mandalService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  async loadMandalDetail(@Param('id') id: number) {
    try {
      return await this.mandalService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async manageMandal(@Body() body: MandalDto, userId: number) {
    try {
      return await this.mandalService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateMandalStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return await this.mandalService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
