import { Controller, Get, Param } from '@nestjs/common';
import { PagesService, Public } from '@server/common';
import { ILegalPage, ILegalPageList, ITableList } from '@vsd-common/lib';

@Controller('misc')
export class MiscController {
  constructor(private pagesService: PagesService) {
  }

  @Public()
  @Get('pages')
  async getPages(): Promise<ITableList<ILegalPageList>> {
    try {
      return await this.pagesService.load();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Public()
  @Get('/public/page/:page')
  async getPage(@Param('page') page: string): Promise<ILegalPage> {
    try {
      return await this.pagesService.getById(page);
    } catch (e) {
      throw new Error(e);
    }
  }
}
