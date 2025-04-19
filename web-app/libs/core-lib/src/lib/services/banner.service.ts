import { Injectable } from '@angular/core';
import { ApiUrls } from '../api-urls';
import { IBannerList, IResponse } from '@vsd-common/lib';
import { HttpService } from './http.service';

@Injectable()
export class BannerService {
  labels: Map<string, string> = new Map<string, string>();

  constructor(private httpService: HttpService) {
  }

  async loadBanner(bannerFor: string): Promise<IBannerList[]> {
    const res = (await this.httpService.getRequest<IResponse<IBannerList[]>>(ApiUrls.BANNER + '/' + bannerFor));
    return res as IBannerList[];
  }
}
