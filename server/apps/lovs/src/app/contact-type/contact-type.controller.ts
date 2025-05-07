import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContactTypeService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IContactTypeList, ITableList } from '@vsd-common/lib';
import { ContactTypeDto } from './dto/contact-type.dto';

@Controller('contact-type')
export class ContactTypeController {
  constructor(private contactTypeService: ContactTypeService) {
  }

  @Post()
  async loadContactTypes(@Body() payload: TableListDto): Promise<ITableList<IContactTypeList>> {
    try {
      return await this.contactTypeService.load(payload);
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
  async manageContactType(@Body() body: ContactTypeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.contactTypeService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateContactTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.contactTypeService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
