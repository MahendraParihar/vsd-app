import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressTypeService, TableListDto, StatusChangeDto } from '@server/common';
import { IAddressTypeList, ITableList } from '@vsd-common/lib';

@Controller('address-type')
export class AddressTypeController {
  constructor(private addressTypeService: AddressTypeService) {
  }

  @Post()
  loadAddressTypes(@Body() payload: TableListDto): Promise<ITableList<IAddressTypeList>> {
    try {
      return this.addressTypeService.load(payload);
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

  @Post()
  manageAddressType(@Body() body) {
    try {
    return this.addressTypeService.manage(body, 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateAddressTypeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
    return this.addressTypeService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
