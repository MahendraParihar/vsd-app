import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { TableListDto, StatusChangeDto } from '@server/common';
import { INewsList, ITableList } from '@vsd-common/lib';

@Controller('news')
export class NewsController {

  constructor(private newsService: NewsService) {
  }

  @Post()
  loadAllNews(@Body() payload: TableListDto): Promise<ITableList<INewsList>> {
    try {
      return this.newsService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadNews() {
    try {
      return this.newsService.getById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadNewsDetail() {
    try {
      return this.newsService.loadDetailById();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  manageNews() {
    try {
      return this.newsService.manage();
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateNewsStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.newsService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
