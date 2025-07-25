import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IServiceList, ITableList, IService } from '@vsd-common/lib';
import { ServiceDto } from './dto/service.dto';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {
  }

  @Post()
  async loadServices(@Body() payload: TableListDto): Promise<ITableList<IServiceList>> {
    try {
      return await this.serviceService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadService(@Param('id') id: number): Promise<IService> {
    try {
      return this.serviceService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadServiceDetail(@Param('id') id: number): Promise<IServiceList> {
    try {
      return this.serviceService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageService(@Body() body: ServiceDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.serviceService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateServiceStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.serviceService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
