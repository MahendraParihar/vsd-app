import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressTypeService, CurrentUser, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IAddressTypeList, ITableList } from '@vsd-common/lib';
import { AddressTypeDto } from './dto/address-type.dto';

@Controller('address-type')
export class AddressTypeController {
  constructor(private addressTypeService: AddressTypeService) {
  }

  @Post()
  async loadAddressTypes(@Body() payload: TableListDto): Promise<ITableList<IAddressTypeList>> {
    try {
      return await this.addressTypeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadAddressType(@Param('id') id: number) {
    try {
      return this.addressTypeService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadAddressTypeDetail(@Param('id') id: number) {
    try {
      return this.addressTypeService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageAddressType(@Body() body: AddressTypeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.addressTypeService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateAddressTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.addressTypeService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
