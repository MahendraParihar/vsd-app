import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContactTypeService, TableListDto, StatusChangeDto } from '@server/common';
import { IContactTypeList, ITableList } from '@vsd-common/lib';
import { ContactTypeDto } from './dto/contact-type.dto';

@Controller('contact-type')
export class ContactTypeController {
  constructor(private contactTypeService: ContactTypeService) {
  }

  @Post()
  loadContactTypes(@Body() payload: TableListDto): Promise<ITableList<IContactTypeList>> {
    try {
      return this.contactTypeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadContactType(@Param('id') id: number) {
    try {
      return this.contactTypeService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadContactTypeDetail(@Param('id') id: number) {
    try {
      return this.contactTypeService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageContactType(@Body() body: ContactTypeDto, userId: number) {
    try {
      return this.contactTypeService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateContactTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.contactTypeService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
