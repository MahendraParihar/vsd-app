import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IBannerList, ITableList, ITableListFilter } from '@vsd-common/lib';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {
  }

  @Public()
  @Get('public/:banner_for')
  async loadPublicBanners(@Param('banner_for') bannerFor: string): Promise<IBannerList[]> {
    try {
      return (await this.bannerService.load(<ITableListFilter>{
        page: 0,
        limit: 10,
      }, bannerFor)).data;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async loadBanners(@Body() payload: TableListDto): Promise<ITableList<IBannerList>> {
    try {
      return this.bannerService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  async loadBanner(@Param('id') id: number) {
    try {
      return this.bannerService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  async manageBanner(@Body() body: BannerDto, userId: number) {
    try {
      return this.bannerService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateBannerStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.bannerService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
