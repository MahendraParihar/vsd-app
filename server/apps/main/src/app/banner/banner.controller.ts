import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser, Public, RequestedIp, StatusChangeDto, TableListDto } from '@server/common';
import { IAuthUser, IBannerList, ITableList, ITableListFilter } from '@vsd-common/lib';
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
  async manageBanner(@Body() body: BannerDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return this.bannerService.manage(body, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  async updateBannerStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto, @CurrentUser() currentUser: IAuthUser, @RequestedIp() requestedIp: string) {
    try {
      return this.bannerService.updateStatus(id, statusChange, currentUser.adminUserId, requestedIp);
    } catch (e) {
      throw new Error(e);
    }
  }
}
