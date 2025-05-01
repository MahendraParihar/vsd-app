import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser, PagesService, Public, TableListDto } from '@server/common';
import { IAuthUser, ILegalPageList, IManageLegalPage, ITableList } from '@vsd-common/lib';
import { LegalPagesDto } from './dto/legal-pages.dto';

@Controller('page')
export class PagesController {
  constructor(private pagesService: PagesService) {
  }

  @Public()
  @Post()
  async loadPages(@Body() payload: TableListDto): Promise<ITableList<ILegalPageList>> {
    try {
      return await this.pagesService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('/public/:page')
  async getPage(@Param('page') page: string): Promise<ILegalPageList> {
    try {
      return await this.pagesService.getByUrl(page);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  async loadLegalPage(@Param('id') id: number): Promise<IManageLegalPage> {
    try {
      return await this.pagesService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageLegalPage(@Body() body: LegalPagesDto, @CurrentUser() currentUser: IAuthUser): Promise<IManageLegalPage> {
    try {
      return await this.pagesService.manage(body, currentUser ? currentUser.adminUserId : 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
