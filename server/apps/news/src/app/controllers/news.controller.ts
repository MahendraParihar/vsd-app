import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { CurrentUser, RequestedIp, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, INewsList, ITableList } from '@vsd-common/lib';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {

  constructor(private newsService: NewsService) {
  }

  @Post()
  async loadAllNews(@Body() payload: TableListDto): Promise<ITableList<INewsList>> {
    try {
      return await this.newsService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadNews(@Param('id') id: number) {
    try {
      return this.newsService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadNewsDetail(@Param('id') id: number) {
    try {
      return this.newsService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async manageNews(@Body() body: NewsDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return await this.newsService.manage(body, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateNewsStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return this.newsService.updateStatus(id, statusChange, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }
}
