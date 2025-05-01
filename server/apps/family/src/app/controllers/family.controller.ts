import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {StatusChangeDto, TableListDto} from "@server/common";
import {FamilyService} from "./family.service";
import {IFamilyList, ITableList} from "@vsd-common/lib";
import {FamilyDto} from "./dto/family.dto";

@Controller()
export class FamilyController {
  constructor(private familyService: FamilyService) {
  }

  @Post()
  async loadFamilies(@Body() payload: TableListDto): Promise<ITableList<IFamilyList>> {
    try {
      return await this.familyService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('search')
  async searchFamilies(@Body() payload: TableListDto): Promise<Partial<IFamilyList>[]> {
    try {
      return await this.familyService.searchFamily(payload, false);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadFamily(@Param('id') id: number) {
    try {
      return this.familyService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadFamilyDetail(@Param('id') id: number) {
    try {
      return this.familyService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageFamily(@Body() body: FamilyDto, userId: number) {
    try {
      return await this.familyService.manage(body, 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateFamilyStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.familyService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
