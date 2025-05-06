import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EducationDegreeService, TableListDto, StatusChangeDto, CurrentUser } from '@server/common';
import { IAuthUser, IEducationDegreeList, ITableList } from '@vsd-common/lib';
import { EducationDegreeDto } from './dto/education-degree.dto';

@Controller('education-degree')
export class EducationDegreeController {
  constructor(private educationDegreeService: EducationDegreeService) {
  }

  @Post()
  async loadEducationDegrees(@Body() payload: TableListDto): Promise<ITableList<IEducationDegreeList>> {
    try {
      return await this.educationDegreeService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadEducationDegree(@Param('id') id: number) {
    try {
      return this.educationDegreeService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadEducationDegreeDetail(@Param('id') id: number) {
    try {
      return this.educationDegreeService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageEducationDegree(@Body() body: EducationDegreeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return await this.educationDegreeService.manage(body, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateEducationDegreeStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser) {
    try {
      return this.educationDegreeService.updateStatus(id, statusChange, currentUser.adminUserId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
