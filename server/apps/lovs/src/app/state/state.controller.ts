import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StateService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IStateList, IState, ITableList } from '@vsd-common/lib';
import { StateDto } from './dto/state.dto';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {
  }

  @Post()
  async loadStates(@Body() payload: TableListDto): Promise<ITableList<IStateList>> {
    try {
      return await this.stateService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadState(@Param('id') id: number): Promise<IState> {
    try {
      return this.stateService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadStateDetail(@Param('id') id: number): Promise<IStateList> {
    try {
      return this.stateService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageState(@Body() body: StateDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.stateService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateStateStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.stateService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
