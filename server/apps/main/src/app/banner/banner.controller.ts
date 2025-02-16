import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public, StatusChangeDto, TableListDto } from '@server/common';
import { IBannerList, ITableList } from '@vsd-common/lib';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {
  }

  @Public()
  @Post('public/:banner_for')
  loadPublicBanners(@Body() payload: TableListDto, @Param('banner_for') bannerFor: string): Promise<ITableList<IBannerList>> {
    try {
      return this.bannerService.load(payload, bannerFor);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  loadBanners(@Body() payload: TableListDto): Promise<ITableList<IBannerList>> {
    try {
      return this.bannerService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadBanner(@Param('id') id: number) {
    try {
      return this.bannerService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageBanner(@Body() body: BannerDto, userId: number) {
    try {
      return this.bannerService.manage(body, 1);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateBannerStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.bannerService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
